import React, { useEffect } from 'react';
import * as bookingActions from '../../store/bookings';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import './YourBookings.css';

function YourBookings({ spots }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const guestId = useSelector(state => state.session.user.id)

    const cancelBooking = e => {
        e.preventDefault();
        const cancelled = dispatch(bookingActions.deleteOneBooking(parseInt(e.target.id)))
        .catch(async(res) => {
            return res.json();
        })
        if (cancelled) {
            history.push('/');
        }
    }

    useEffect(async () => {
        await dispatch(bookingActions.getAllBookings(guestId));
    }, [dispatch])

    const bookings = Object.values(useSelector(state => state.bookings));

    return (
        <div>
            <h2>Your Bookings</h2>
            {bookings.map(booking => {
                const thisSpotId = booking.spotId;
                const thisSpot = spots.spots[thisSpotId];

                let startDateSimple = booking.startDate.split('T').shift();
                let startDateArr = startDateSimple.split('-');
                let startDay = startDateArr[1];
                let startMonth = startDateArr[2];
                let startYear = startDateArr[0];

                let endDateSimple = booking.endDate.split('T').shift();
                let endDateArr = endDateSimple.split('-');
                let endDay = endDateArr[1]
                let endMonth = endDateArr[2]
                let endYear = endDateArr[0]

                return (
                    <div>
                        <h3>{thisSpot.description}</h3>
                        <img src={thisSpot.profileImg}></img>
                        <p>{startDay}/{startMonth}/{startYear} to {endDay}/{endMonth}/{endYear}</p>
                        <p>Number of guests: {booking.numberOfGuests}</p>
                        <button onClick={cancelBooking} id={`${booking.id}`}>Cancel Booking</button>
                    </div>
                )
            })}
        </div>
    )
}

export default YourBookings;
