const express = require('express')
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('join', {
      title: 'Join',
    });
  });

// Post membership password
router.post('/', (req, res) => {
  if (req.body.websitePassword === process.env.MEMBERSHIP_PASSWORD) {
    User.findOneAndUpdate(
      {username: req.user.username},
      {membershipStatus: true},
      (err) => {
        if (err) console.log(err)
        res.redirect('/')
      }
    )
  }
})
  
  module.exports = router;