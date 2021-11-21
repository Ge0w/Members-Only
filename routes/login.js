const express = require('express')
const router = express.Router();
const passport = require('passport')
const bcrypt = require('bcryptjs')

/* GET sign-up page. */
router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login' });
});

// Login
router.post(
    "/",
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
      })
    );

module.exports = router;
