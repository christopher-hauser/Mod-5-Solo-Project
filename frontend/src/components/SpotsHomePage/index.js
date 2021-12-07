import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

import './SpotsHomePage.css';

function SpotsHomePage() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(spotActions.getAllSpots())
        if(!spots) {
            return null;
        }
    }, [dispatch])


    return (
        <main>
            <div>
            {spots.map(spot => {
                return (
                    <div key={spot.id}>
                        <img src={spot.profileImg} />
                        <h2>{spot.city}, {spot.state}</h2>
                        <p>${spot.pricePerNight} / night</p>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default SpotsHomePage;
