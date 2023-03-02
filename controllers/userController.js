const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

//READ all users
router.get("/", (req, res) => {
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to get records.",
        error: error,
      });
    });
});

// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//login route
router.post("/login", (req, res) => {
  // Find the user based on user name
  // Is there a way to use username or email?
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((userData) => {
      // Check if username exists
      if (!userData) {
        return res.status(401).json({
          message: "Incorrect email or password",
        });
      } else {
        // Compare passwords
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.userId = userData.id;
          req.session.email = userData.email;
          req.session.username = userData.username;
          req.session.logged_in = true;
          return res.json(userData);
        } else {
          return res.status(401).json({
            message: "Incorrect email or password",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to create record",
        error: error,
      });
    });
});

//READ one user by id
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        res.status(404).json({
          message: "Record does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "System error! Unable to get record.",
        error: error,
      });
    });
});

//CREATE a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json(userData);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error!",
        error: error,
      });
    });
});

//UPDATE a user
router.put("/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (data[0]) {
        return res.json(data);
      } else {
        return res.status(404).json({ message: "Record does not exist" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to update record.",
        error: error,
      });
    });
});

//DELETE a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).json({ message: "Record does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to delete record.",
        error: error,
      });
    });
});

module.exports = router;
