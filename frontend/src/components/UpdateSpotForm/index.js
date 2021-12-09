import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

import '../NewSpotFormPage/NewSpotFormPage.css';

function UpdateSpotForm({}) {
    const dispatch = useDispatch();

    useEffect(async () => {
         await dispatch(spotActions.getOneSpot(id));
    }, [dispatch])


    const history = useHistory();
    const id = useParams().id;
    const hostId = useSelector((state) => state.session.user.id)
    const prev = useSelector(state => state.spots);

    const {address: prevAddress, city: prevCity, state: prevState, pricePerNight: prevPrice, bedrooms: prevBedrooms,
    beds: prevBeds, bathrooms: prevBaths, description: prevDesc, amenities: prevAmen, profileImg: prevProf} = prev;


    const [address, setAddress] = useState(prevAddress);
    const [city, setCity] = useState(prevCity);
    const [state, setState] = useState(prevState);
    const [pricePerNight, setPricePerNight] = useState(prevPrice);
    const [bedrooms, setBedrooms] = useState(prevBedrooms);
    const [beds, setBeds] = useState(prevBeds);
    const [bathrooms, setBathrooms] = useState(prevBaths);
    const [description, setDescription] = useState(prevDesc);
    const [amenities, setAmenities] = useState(prevAmen);
    const [profileImg, setProfileImg] = useState(prevProf);
    const [errors, setErrors] = useState([]);

    console.log(address);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const updated = await dispatch(spotActions.updateOneSpot({ id, hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg }))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })

        if (updated) {
            history.push('/');
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} id='add-spot-form'>
            <h2>Update your spot's information.</h2>
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
            <div id='buttons'>
                <button type="submit" id='submit-new-spot'>Update your spot!</button>
                <button type="button" id='delete-spot'
                onClick={async (e) => {
                    e.preventDefault();
                    const deleted = await dispatch(spotActions.deleteOneSpot(id))
                        .catch(async res => {
                            const data = res.json();
                        })
                        if (deleted) {
                            history.push('/');
                        }
                }}
                >Take your spot down.</button>
            </div>
        </form>
        </>
    )
}

export default UpdateSpotForm;
