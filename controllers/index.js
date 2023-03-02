const express = require("express");
const router = express.Router();

// Import route
const blogRoutes = require("./blogController");
// Tell router to append "api/blogs/" and use the route that was imported
router.use("/api/blogs", blogRoutes);

const userRoutes = require("./userController");
router.use("/api/users", userRoutes);

const commentRoutes = require("./commentController");
router.use("/api/comments", commentRoutes);

const frontEndRoutes = require("./frontEndController");
router.use("/", frontEndRoutes);

module.exports = router;
