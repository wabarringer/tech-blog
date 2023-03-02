// Import express
const express = require("express");

// Inport path module to manipulate file paths
const path = require("path");

// Set port const
const PORT = process.env.PORT || 3001;

// Import routes from controller
const allRoutes = require("./controllers");

// Import the connection object (The new Sequalize constructor in connection.js)
const sequelize = require("./config/connection");

// Import express extension called session
const session = require("express-session");

// Import express extension called handlebars
const exphbs = require("express-handlebars");

// Declare app variable as express
const app = express();

// TODO: define this code
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// TODO: define this code
const sess = {
  secret: process.env.SECRET,
  coockie: {
    maxAge: 1000 * 60 * 60 * 2,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// TODO: define this code
app.use(session(sess));

// Middleware to allow any req.body to be parsed and read by express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set variable hbs to create MVC
const hbs = exphbs.create({});

// Create a view engine called handlebars
app.engine("handlebars", hbs.engine);

// Tell app to use the view engine created
app.set("view engine", "handlebars");

// Set express to immediately look for file of matching name amongst static assests in /public
app.use(express.static(path.join(__dirname, "public")));

// Tells express app to use controllers/index.js
app.use(allRoutes);

// TODO: define this code
app.get("/sessions", (req, res) => {
  res.json(req.session);
});

// Connect to database before running express server
// Then connect to PORT
sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
  });
});
