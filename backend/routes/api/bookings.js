const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { addNewBooking, getBookings, deleteBooking } = require('../../db/bookings')

const validateBooking = [
    check('numberOfGuests')
        .exists({ checkFalsy: true })
        .withMessage('Please let your host know how many guests you\'ll be bringing.'),
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage('Please enter the start date for your stay.'),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage('Please enter the end date for your stay.'),
    handleValidationErrors
]

const router = express.Router();

router.post(
    '/',
    requireAuth,
    validateBooking,
    asyncHandler(async (req, res) => {
        const { spotId, guestId, numberOfGuests, startDate, endDate } = req.body;
        const booking = await addNewBooking(spotId, guestId, numberOfGuests, startDate, endDate);

        return res.json({
            booking
        })
    })
)

router.get(
    '/users/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const guestId = req.params.id;
        const booking = await getBookings(guestId);
        return res.json(booking);
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        await deleteBooking(id);
        return res.json({
            message: 'Booking successfully deleted.'
        })
    })
)

module.exports = router;
