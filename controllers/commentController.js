const express = require("express");
const router = express.Router();
const { Comment } = require("../models");

//READ all
router.get("/", (req, res) => {
  Comment.findAll()
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

//READ one
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id)
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
        message: "Server error! Unable to get data.",
        error: error,
      });
    });
});

//CREATE
router.post("/:blogId", (req, res) => {
  Comment.create({
    content: req.body.content,
    userId: req.session.userId,
    blogId: req.params.blogId,
  })
    .then((blogData) => {
      res.json(blogData);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error!",
        error: error,
      });
    });
});

//UPDATE
router.put("/:id", (req, res) => {
  Comment.update(
    {
      content: req.body.content,
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
        return res.status(404).json({
          message: "Record does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to update.",
        error: error,
      });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).json({
          message: "Record does not exist.",
        });
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
