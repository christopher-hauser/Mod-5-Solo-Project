import React, { useEffect, useState } from "react";
import * as bookingActions from '../../store/bookings';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import './BookingASpot.css';


function BookingForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotId = useSelector(state => state.spots.currentSpot.id);
    const guestId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })
    const [numberOfGuests, setNumberOfGuests] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState([]);

    const getBookedDates = async () => {
        console.log('useEffect')
        const res = await fetch(`/api/bookings/${spotId}`);
        const bookings = await res.json();
        console.log(bookings);
        const bookingDates = [];

        function addDays(date, days) {
            let result = new Date(date);
            console.log('before', result)
            result.setDate(result.getDate() + days);
            console.log('after', result)
            return result;
          }

        function getDates(startDate, stopDate) {
            console.log(startDate, stopDate)
            let dateArray = []
            let currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(new Date(currentDate));
                console.log(currentDate)
                currentDate = addDays(currentDate, 1)
            }
            return dateArray;
        }

        bookings?.map(booking => {
            let start = booking.startDate;
            let end = booking.endDate;
            console.log(start, end)
            let dates = getDates(start, end);
            console.log(dates);

        })
        return bookings;
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const booked = await dispatch(bookingActions.addNewBooking({ spotId, guestId, numberOfGuests, startDate, endDate }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })

        if (booked) {
            history.push('/your-bookings');
        }
    }

    useEffect(async () => {
        await getBookedDates();
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit} id='book-spot-form'>
                <h2>Book this spot!</h2>
                <div id='book-spot-info-container'>
                    <label>
                        How many guests will be staying?
                        <input
                            id='guest-input'
                            type="number"
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                            required
                        />
                    </label>
                    <div id='date-container'>
                        <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                            selectsRange
                            inline
                        />
                    </div>
                </div>
                <ul id='spot-booking-error-list'>
                    {errors.map((error, idx) => <li className='book-spot-error' key={idx}>{error}</li>)}
                </ul>
                <button type="submit" id="submit-new-booking">Book your stay!</button>
            </form>
        </>
    )
}

export default BookingForm;
