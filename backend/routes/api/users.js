const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a first name with at least 2 characters.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Please provide a last name.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

const router = express.Router();

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, firstName, lastName, username, password} = req.body;
      console.log(req.body);
      const host = false;
      const profileImg = null;
      const user = await User.signup({ email, username, firstName, lastName, password, host, profileImg });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
  );

module.exports = router;
