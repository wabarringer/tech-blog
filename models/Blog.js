// Import sequelize and de-structuring to pull Model class and DataTypes object (avoid WET code)
const { Model, DataTypes } = require("sequelize");
// Import connection
const sequelize = require("../config/connection");

// Create model name that extend the imported Model class
class Blog extends Model {}

// class method to create table fields
Blog.init(
  // Create table using object with properties
  {
    title: {
      type: DataTypes.STRING,
      // Prevents empt field
      allowNull: false,
    },
    content: {
      // Use TEXT instead of STRING to make VARCHAR unlimited instead of maxing out at 255
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    // Changes all camelCase to underscored in tabele
    underscored: true,
    // Changes table name to blog with lower case rather than with upper case
    modelName: "blog",
  }
);

module.exports = Blog;
