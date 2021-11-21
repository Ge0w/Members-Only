const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { body, validationResult, sanitizeBody } = require('express-validator');
const User = require('../models/User')

/* GET sign-up page. */
router.get('/', (req, res, next) => {
    res.render('sign-up', { title: 'Sign-Up' });
});

// Validation of sign-up
router.post(
    '/',
    // password must be at least 5 chars long
    body('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    body('lastname', 'Please enter last name')
        .isLength({ min: 5 })
        .isString(),
    body('firstname', 'Please enter first name')
        .isLength({ min: 5 })
        .isString(),
    body('password', 'Password is too short').isLength({ min: 5 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        const alert = errors.array()
        res.render('sign-up', {
            title: 'Sign-Up',
            alert
        })
      }
      
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            membershipStatus: false
            })
        res.redirect('/login')
        })
    },
  );

module.exports = router;
