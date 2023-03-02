const express = require("express");
const { User, Blog, Comment } = require("../models");
const router = express.Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    res.redirect("/home");
  }
});

router.get("/sessions", (req, res) => {
  res.json(req.session);
});

router.get("/login", (req, res) => {
  if (!req.session.logged_in) {
    res.render("login");
  } else {
    res.redirect("/home");
  }
});

router.get("/home", async (req, res) => {
  try {
    if (req.session.logged_in) {
      console.log(req.session);
      const blogData = await Blog.findAll({
        include: [User],
      });

      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      console.log(blogs);
      res.render("home", {
        blogs,
        logged_in: req.session.logged_in,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error! Unable to get records.",
      error,
    });
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    const userData = await User.findByPk(req.session.user_id, {
      include: {
        model: Blog,
        include: {
          model: Comment,
        },
      },
    });
    if (!userData) {
      res.redirect("/login");
    }

    const userHbs = userData.toJSON();
    console.log(userHbs);
    res.render("dashboard", userHbs);
  }
});

module.exports = router;
