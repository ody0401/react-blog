const Sequelize = require('sequelize');
const post = require('./post');
const user = require('./user');
const image = require('./image');
const comment = require('./comment');

const env = process.env.NODE_EVN || 'development';
const config = require('../config/config.js')[env];
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Post = post;
db.Comment = comment;
db.Image = image;
db.User = user;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
