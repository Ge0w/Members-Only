const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find()
    .populate({ path: "user", model: User })
    .exec((err, messages) => {
      res.render("index", {
        title: "Homepage",
        messages,
        user: req.user,
      });
    });
});

// POST Message
router.post("/", function (req, res, next) {
  User.findOne({ username: req.user.username }).exec((err, user) => {
    Message.create({
      title: req.body.subject,
      message: req.body.message,
      user,
      date: new Date(),
    });
  });
  res.redirect("/");
});

module.exports = router;
