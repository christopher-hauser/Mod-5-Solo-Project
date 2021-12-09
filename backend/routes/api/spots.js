const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { addNewSpot, getAllSpots, getOneSpot, updateSpot, deleteSpot } = require('../../db/spots')
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
    check('state')
        .isLength({ min: 2, max: 2 })
        .withMessage('Please enter the abbreviated version of your state\'s name.'),
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
        const { hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = req.body;
        const spot = await addNewSpot(hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg)

        return res.json({
            spot
        });
    })
);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const spots = await getAllSpots()
        return res.json(spots);
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const spot = await getOneSpot(id);
        return res.json(spot);
    })
)

router.put(
    '/:id',
    validateNewSpot,
    asyncHandler(async (req, res) => {
        const { id, hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = req.body;
        const updatedSpot = await updateSpot(id, hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg)
        return res.json({
            updatedSpot
        })
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        await deleteSpot(id);
        return res.json({
            message: 'Spot successfully deleted.'
        })
    })
)

module.exports = router;
