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
        <div id='bookings-page'>
            <div id='your-bookings-title-div'>
                <h2 id='your-bookings-title'>Bookings</h2>
            </div>
            {!Object.values(bookings).length && (
                <p>You don't have any bookings yet.</p>
            )}
            <div id='bookings-container'>

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
                    <div className='bookings-block'>
                        <h3>{thisSpot.description}</h3>
                        <div className='booking-spot-info'>
                            <div className='booking-spot-image-container'>
                                <img src={thisSpot.profileImg} className='booking-spot-image'></img>
                            </div>
                            <div className='booking-spot-info-div'>
                                <p className='booking-dates'>{startDay}/{startMonth}/{startYear} to {endDay}/{endMonth}/{endYear}</p>
                                <p className='booking-guests'>{booking.numberOfGuests} guests</p>
                                <button className='cancel-booking-button' onClick={cancelBooking} id={`${booking.id}`}>Cancel Booking</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default YourBookings;
