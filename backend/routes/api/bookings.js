const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { addNewBooking, getBookings, deleteBooking } = require('../../db/bookings')

const checkForPast = (value) => {
    const currentDate = new Date();
    let currentDateSimple = currentDate.toString().split('T').shift();
    let currentDateArr = currentDateSimple.split('-')[0].split(' ');
    let currentDay = parseInt(currentDateArr[2]);
    let currentMonth = currentDateArr[1].toLowerCase();
    let currentYear = parseInt(currentDateArr[3]);
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let currentMonthNo = (months.indexOf(currentMonth) + 1);

    let startDateSimple = value.split('T').shift();
    let startDateArr = startDateSimple.split('-');
    let startDay = parseInt(startDateArr[2]);
    let startMonth = parseInt(startDateArr[1]);
    let startYear = parseInt(startDateArr[0]);

    if (currentYear > startYear || currentYear === startYear && currentMonthNo > startMonth || currentYear === startYear && currentMonthNo === startMonth && currentDay > startDay) {
        return false;
    } else {
        return true;
    }
}

const validateBooking = [
    check('numberOfGuests')
        .exists({ checkFalsy: true })
        .withMessage('Please let your host know how many guests you\'ll be bringing.'),
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the start date for your stay.'),
    check('startDate')
        .custom(value => {
            return checkForPast(value);
        })
        .withMessage('All booking dates must be in the future.'),
    check('endDate')
        .custom(value => {
            return checkForPast(value);
        })
        .withMessage('All booking dates must be in the future.'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('Please enter the end date for your stay.'),
    check('startDate', 'endDate')
        .custom((start, { req }) => {
            const end = req.body.endDate;
            let startDateSimple = start.split('T').shift();
            let startDateArr = startDateSimple.split('-');
            let startDay = parseInt(startDateArr[2]);
            let startMonth = parseInt(startDateArr[1]);
            let startYear = parseInt(startDateArr[0]);

            let endDateSimple = end.split('T').shift();
            let endDateArr = endDateSimple.split('-');
            let endDay = parseInt(endDateArr[2]);
            let endMonth = parseInt(endDateArr[1]);
            let endYear = parseInt(endDateArr[0]);
            
            if (endYear < startYear || endYear === startYear && endMonth < startMonth || endYear === startYear && endMonth === startMonth && endDay < startDay) {
                return false;
            } else return true;
        })
        .withMessage('Your start date must come before your end date.'),
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
        console.log(id);
        await deleteBooking(id);
        return res.json({
            message: 'Booking successfully deleted.'
        })
    })
)

module.exports = router;
