const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBooking = [
    handleValidationErrors
]

const router = express.Router();

// router.post(
//     '/',
//     requireAuth,
//     validateBooking,
//     asyncHandler(async (req, res) => {
//         const { spotId, }
//     })
// )



module.exports = router;
