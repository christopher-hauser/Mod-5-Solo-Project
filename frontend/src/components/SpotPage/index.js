import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

import './SpotPage.css'

function Spot() {
    const dispatch = useDispatch();
    const id = useParams().id;

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [dispatch])

    const spot = useSelector(state => state.spots)

    return (
        <div key={spot.id} id="spot-container">
            <div>
                <h2 id='spot-title'>{spot.description}</h2>
                <h3>{spot.address} {spot.city}, {spot.state}</h3>
            </div>
            <div id='images-container'>
                {spot.profileImg && (
                    <img alt={spot.description} src={spot.profileImg} id='spot-page-main-img'/>
                )}
                {!spot.profileImg && (
                    <img alt='default' src={'https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'} className="spot-block-img"/>
                )}
                <div id='other-images'>
                    <div id='img1'></div>
                    <div id='img2'></div>
                    <div id='img3'></div>
                    <div id='img4'></div>
                </div>

            </div>
            <div id='spot-page-location-info'>
                <p>Bedrooms: {spot.bedrooms}</p>
                <p>*</p>
                <p>Beds: {spot.beds}</p>
                <p>*</p>
                <p>Bathrooms: {spot.bathrooms}</p>
            </div>
                <p>${spot.pricePerNight} / night</p>
                <p>Amenities: {spot.amenities}</p>
        </div>
    )
}

export default Spot;
