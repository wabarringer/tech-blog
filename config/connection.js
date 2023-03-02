// Import environment variables from .env
require("dotenv").config();

// Import Sequalize from node modules
const Sequelize = require("sequelize");

let sequelize;

// Allow connection when deployed
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// Create new Sequalize constructor with the arguments of the db name, user, password and location
  sequelize = new Sequelize(
    // Use environment variables
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// Export so other files can access my Sequalize
module.exports = sequelize;
