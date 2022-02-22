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
    const [bookedDates, setBookedDates] = useState([]);

    //helper functions
    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    function getDates(startDate, stopDate) {
        startDate = new Date(startDate);
        stopDate = new Date(stopDate);
        stopDate.setDate(stopDate.getDate() + 1)
        let dateArray = []
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1)
        }
        return dateArray;
    }

    const getBookedDates = async () => {
        const res = await fetch(`/api/bookings/${spotId}`);
        const bookings = await res.json();
        let bookingDates = [];


        bookings?.map(booking => {
            let start = booking.startDate;
            let end = booking.endDate;
            let dateArray = getDates(start, end);
            bookingDates = [...bookingDates, ...dateArray]
        })
        return bookingDates;
    }

    const checkIfBooked = (startDate, endDate, bookings) => {
        // grab range from startDate/endDate
        let potentialDates = getDates(startDate, endDate);
        let bookingsSimple = [];
        // set bookings to month/day/year
        for (let i = 0; i < bookings.length; i++) {
            let day = bookings[i].getDate();
            let month = bookings[i].getMonth();
            let year = bookings[i].getYear();
            bookingsSimple.push("string"+day+month+year);
        }

        // see if a potential date exists in bookings already;
        for (let i = 0; i < potentialDates.length; i++) {
            let day = potentialDates[i].getDate();
            let month = potentialDates[i].getMonth();
            let year = potentialDates[i].getYear();
            let potentialDateSimple = "string"+day+month+year;
            if (bookingsSimple.includes(potentialDateSimple)) {
                setErrors(['Please select a range of dates that have not already been booked.']);
                return true;
            }
        }
        return false;
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const alreadyBooked = checkIfBooked(startDate, endDate, bookedDates);
        if (alreadyBooked) return;
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
        const booked = await getBookedDates();
        setBookedDates(booked);
    }, [])

    console.log(startDate, endDate)

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
                            excludeDates={bookedDates}
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
