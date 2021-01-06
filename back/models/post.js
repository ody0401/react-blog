const DataTypes = require('sequelize');
const {Model} = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    }, {
      modelName: 'Post',
      tableName: 'posts',
      charset: 'utf8mb4',
      collate : 'utf8mb4_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
  }
}