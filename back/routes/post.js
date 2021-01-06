const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {Post, Image, User, Comment} = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/upload', isLoggedIn , upload.single('image'), (req, res, next) => {
  console.log(req.file)
  res.status(200).json({filepath: req.file.filename})
})

router.post('/', isLoggedIn,  upload.none(), async (req,res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId : req.user.id
    });
    if (req.body.image) {
      const image = await Image.create({
        src: req.body.image
      })
      await post.addImages(image);
    }
    res.status(200).send('ok')
  } catch (error) {
    console.error(error)
    next(error);
  }
})

router.get('/loadpost', async (req,res, next) => {
  try {
    const posts = await Post.findAll({
      order:[['createdAt', 'DESC']],
      include: [{
        model : Image,
        attributes: ['src']
      }]
    })
    res.status(200).json(posts)
  } catch (error) {
    console.error(error);
    next(error)
  }
})

router.get('/:Id', async (req, res, next) => {
  try {
    console.log(req.params.Id)
    const post = await Post.findOne({
      where: {id: req.params.Id},
      include: [{
        model: User,
        attributes: ['id', 'name'],
      }, {
        model: Image,
        attributes: ['src']
      }]
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/comment', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.comment,
      PostId: req.body.postId,
      UserId: req.body.userId,
    })
    res.status(200).json('ok')
  } catch (error) {
    console.error(error)
    next(error);
  }
})

router.get('/loadcomment/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      where: {PostId: req.params.id},
      attributes: ['id', 'content'],
      include:[{
        model: User,
        attributes : ['id', 'name']
      }]
    })
    res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    next(error);
  }
})

module.exports = router;