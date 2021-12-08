import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
    const [profileImg, setProfileImg] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        await dispatch(spotActions.addNewSpot({ hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
            console.log(errors);
        if (!errors.length) {
            history.push('/');
        }
    }

    return (
        <form onSubmit={handleSubmit} id='add-spot-form'>
            <h2>Tell us about the spot you'd like to host.</h2>
            <ul id='add-spot-error-list'>
                {errors.map((error, idx) => <li className='add-spot-error' key={idx}>{error}</li>)}
            </ul>
            <div id="info-container">
                <div id='combined-info-container'>
                    <div id='location-container'>
                        <label>
                        Street Address
                        <input
                        type ="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        />
                        </label>
                        <label>
                        City
                        <input
                        type ="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                        </label>
                        <label>
                        State
                        <input
                        type ="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        />
                        </label>
                    </div>
                    <div id='spot-info-container'>
                        <label>
                        Price per Night
                        <input
                        className='number-input'
                        type ="number"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(parseInt(e.target.value))}
                        required
                        />
                        </label>
                        <label>
                        Bedrooms
                        <input
                        className='number-input'
                        type ="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(parseInt(e.target.value))}
                        required
                        />
                        </label>
                        <label>
                        Beds
                        <input
                        className='number-input'
                        type ="number"
                        value={beds}
                        onChange={(e) => setBeds(parseInt(e.target.value))}
                        required
                        />
                        </label>
                        <label>
                        Bathrooms
                        <input
                        className='number-input'
                        type ="number"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(parseInt(e.target.value))}
                        required
                        />
                        </label>
                    </div>
                </div>
                    <label>
                    Description
                    </label>
                    <textarea
                    type ="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                    <label>
                    Amenities
                    <input
                    id='amenities-input'
                    type ="text"
                    value={amenities}
                    onChange={(e) => setAmenities(e.target.value)}
                    />
                    </label>
                    <label>
                    Show us your place!
                    <input
                    type ="text"
                    value={profileImg}
                    placeholder='Image URL'
                    onChange={(e) => setProfileImg(e.target.value)}
                    />
                    </label>
            </div>
            <button type="submit" id='submit-new-spot'>Host your spot!</button>
        </form>
    )
}

export default NewSpotFormPage;
