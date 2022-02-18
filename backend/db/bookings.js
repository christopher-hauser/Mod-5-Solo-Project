const { Booking } = require('./models');

async function addNewBooking(spotId, guestId, numberOfGuests, startDate, endDate) {
    const booking = await Booking.create({
        spotId,
        guestId,
        numberOfGuests,
        startDate,
        endDate
    })
    return await Booking.findByPk(booking.id);
}

async function getBookings(guestId) {
    const bookings = await Booking.findAll({
        where: {
            guestId
        }
    })
    if (bookings) {
        return bookings;
    } else {
        return null;
    }
}

async function getAllBookingDates(spotId) {
    const bookings = await Booking.findAll({
        where: {
            spotId
        }
    });

    if (bookings) return bookings;
    else return null;
}

async function deleteBooking(bookingId) {
    const booking = await Booking.findByPk(bookingId);
    return await booking.destroy();
}

module.exports = {
    addNewBooking,
    getBookings,
    getAllBookingDates,
    deleteBooking
}
