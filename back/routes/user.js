const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const { isNotLoggedIn , isLoggedIn} = require('./middleware');
const  {User, Post} = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      console.log(req.user.id);
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id'],
        include: [{
          model: Post,
          attributes: ['id'],
        }]
      })
      res.status(200).json(user);
    } else {
      res.status(200).json(null)
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/', isNotLoggedIn ,async(req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.status(201).send('회원가입에 성공하였습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).send('로그인에 성공하였습니다.'); 
    })
  })(req,res,next);
})

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;