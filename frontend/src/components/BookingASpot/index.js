import React, { useState } from "react";
import * as bookingActions from '../../store/bookings';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './BookingASpot.css';

function BookingForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotId = useSelector(state => state.spots.id);
    const guestId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })
    const [numberOfGuests, setNumberOfGuests] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        const booked = dispatch(bookingActions.addNewBooking({ spotId, guestId, numberOfGuests, startDate, endDate }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })

        if (booked) {
            history.push('/');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} id='book-spot-form'>
                <h2>Book this spot!</h2>
                <ul id='spot-booking-error-list'>
                    {errors.map((error, idx) => <li className='book-spot-error' key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label>
                        How many guests will be staying?
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" id="submit-new-booking">Book your stay!</button>
            </form>
        </>
    )
}

export default BookingForm;
