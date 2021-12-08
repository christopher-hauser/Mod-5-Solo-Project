import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from '../../store/spots'

import './SpotPage.css'

function Spot() {
    console.log('in spot')
    const dispatch = useDispatch();
    const spotId = useParams();
    const spot = dispatch(spotActions.getOneSpot(spotId))

    return (
        <div key={spot.id} className="spot-container">
            <div>
                <h2>{spot.description}</h2>
                <h3>{spot.address} {spot.city}, {spot.state}</h3>
            </div>
            <div className='spot-page-img'>
                {spot.profileImg && (
                    <img alt={spot.description} src={spot.profileImg} className="spot-block-img"/>
                )}
                {!spot.profileImg && (
                    <img alt='default' src={'https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'} className="spot-block-img"/>
                )}
            </div>
            <div id='spot-page-location-info'>
                <p>${spot.pricePerNight} / night</p>
                <p>Bedrooms: {spot.bedrooms}</p>
                <p>Beds: {spot.beds}</p>
                <p>Bathrooms: {spot.bathrooms}</p>
                <p>Amenities: {spot.amenities}</p>
            </div>
        </div>
    )
}

export default Spot;
