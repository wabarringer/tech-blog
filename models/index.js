// Import all models
const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

// Create associations
Blog.belongsTo(User, {
  onDelete: "CASCADE",
});

User.hasMany(Blog);

Comment.belongsTo(User, {
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  onDelete: "CASCADE",
});

User.hasMany(Comment);

Blog.hasMany(Comment);

// Export a single object with all models
module.exports = {
  Blog,
  User,
  Comment,
};
