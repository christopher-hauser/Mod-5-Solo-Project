import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";

import './NewSpotFormPage.css';

function NewSpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const hostId = useSelector((state) => state.session.user.id)
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pricePerNight, setPricePerNight] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        dispatch(spotActions.addNewSpot({ hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        return <Redirect to='/' />
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Tell us about the spot you'd like to host.</h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Street Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Price per Night
                <input
                    type="number"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(parseInt(e.target.value))}
                    required
                />
            </label>
            <label>
                Bedrooms
                <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                    required
                />
            </label>
            <label>
                Beds
                <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(parseInt(e.target.value))}
                    required
                />
            </label>
            <label>
                Bathrooms
                <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(parseInt(e.target.value))}
                    required
                />
            </label>
            <label>
                Description
            </label>
            <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label>
                Amenities
                <input
                    type="text"
                    value={amenities}
                    onChange={(e) => setAmenities(e.target.value)}
                />
            </label>
            <button type="submit">Host your spot!</button>
        </form>
    )
}

export default NewSpotFormPage;
