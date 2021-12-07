const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { addNewSpot } = require('../../db/spots')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateNewSpot = [
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please give us a short description of your spot.'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please tell us your spot\'s street address.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please tell us the city your spot is in.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Please select the state your spot is in.'),
    check('pricePerNight')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the amount you will charge per night to stay at your spot.'),
    check('bedrooms')
        .exists({ checkFalsy: true })
        .withMessage('Please let us know how many bedrooms your spot has.'),
    check('beds')
        .exists({ checkFalsy: true })
        .withMessage('Please let us know how many beds your spot has available.'),
    check('bathrooms')
        .exists({ checkFalsy: true })
        .withMessage('Please let us know how many bathrooms your spot has available.'),
        handleValidationErrors
]

const router = express.Router();

router.post(
    '/',
    requireAuth,
    validateNewSpot,
    asyncHandler(async (req, res) => {
        const { hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities } = req.body;
        console.log('in post route', hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities)
        const spot = await addNewSpot(hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities)

        return res.json({
            spot
        });
    })
);

module.exports = router;
