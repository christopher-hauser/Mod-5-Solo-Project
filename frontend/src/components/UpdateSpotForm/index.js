import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

import '../NewSpotFormPage/NewSpotFormPage.css';

function UpdateSpotForm() {
    const dispatch = useDispatch();

    useEffect(async () => {
        await dispatch(spotActions.getOneSpot(id));
    }, [dispatch])

    const history = useHistory();
    const id = useParams().id;
    const hostId = useSelector((state) => state.session.user.id)
    const spot = useSelector(state => state.spots);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pricePerNight, setPricePerNight] = useState(0)
    const [bedrooms, setBedrooms] = useState(0)
    const [beds, setBeds] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [description, setDescription] = useState('');
    const [amenities, setAmenities] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setPricePerNight(spot.pricePerNight);
            setBedrooms(spot.bedrooms);
            setBeds(spot.beds);
            setBathrooms(spot.bathrooms);
            setDescription(spot.description);
            setAmenities(spot.amenities);
            setProfileImg(spot.profileImg);
        }
    })

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
                        </div>
                        <div id='spot-info-container'>
                            <label>
                                Price per Night
                                <input
                                    className='number-input'
                                    type="number"
                                    value={pricePerNight}
                                    onChange={(e) => setPricePerNight(parseInt(e.target.value))}
                                    required
                                />
                            </label>
                            <label>
                                Bedrooms
                                <input
                                    className='number-input'
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
                                    required
                                />
                            </label>
                            <label>
                                Beds
                                <input
                                    className='number-input'
                                    type="number"
                                    value={beds}
                                    onChange={(e) => setBeds(parseInt(e.target.value))}
                                    required
                                />
                            </label>
                            <label>
                                Bathrooms
                                <input
                                    className='number-input'
                                    type="number"
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
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>
                        Amenities
                        <input
                            id='amenities-input'
                            type="text"
                            value={amenities}
                            onChange={(e) => setAmenities(e.target.value)}
                        />
                    </label>
                    <label>
                        Show us your place!
                        <input
                            type="text"
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
                                    return res
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
