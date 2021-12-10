import { csrfFetch } from "./csrf";

export const ADD_BOOKING = 'bookings/addBooking';
export const LOAD_BOOKINGS = 'bookings/loadBookings';
export const DELETE_BOOKING = 'bookings/deleteBooking';

// ACTIONS

const addBooking = booking => {
    return {
        type: ADD_BOOKING,
        payload: booking
    }
}

const loadBookings = bookings => {
    return {
        type: LOAD_BOOKINGS,
        payload: bookings
    }
}

const deleteBooking = () => {
    return {
        type: DELETE_BOOKING
    }
}

// THUNK ACTIONS

export const addNewBooking = newBooking => async dispatch => {
    const { spotId, guestId, numberOfGuests, startDate, endDate } = newBooking;
    const response = await csrfFetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            spotId,
            guestId,
            numberOfGuests,
            startDate,
            endDate
        })
    });
    const booking = await response.json();
    dispatch(addBooking(booking));
    return booking;
}

export const getAllBookings = guestId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/users/${guestId}`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadBookings(bookings));
    }
    return response;
}

export const deleteOneBooking = bookingId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    await dispatch(deleteBooking());
    return response;
}

const bookingsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_BOOKING:
            newState = {
                ...state,
                [action.payload.booking.id]: action.payload.booking
            };
            return newState;
        case LOAD_BOOKINGS:
            newState = {};
            action.payload.map((booking) => {
                const bookingId = booking.id;
                return newState[bookingId] = action.payload.find(booking => booking.id === bookingId)
            })
            return newState;
        case DELETE_BOOKING:
            return {};
        default:
            return state;
    }
}

export default bookingsReducer;
