const User = require("./User");
const Post = require("./Post");
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// The association can also be created from the Car side
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post,Comment };
