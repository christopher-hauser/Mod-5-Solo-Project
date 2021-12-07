import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import SpotBlock from "../SpotBlock";

import './SpotsHomePage.css';

function SpotsHomePage() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(spotActions.getAllSpots())
        if (!spots) {
            return null;
        }
    }, [dispatch])

    return (
        <main>
            <div className="spots-container">
                {spots.length && spots.map(spot => {
                    return (
                        <SpotBlock spot={spot} />
                    )
                })}
            </div>
        </main>
    )
}

export default SpotsHomePage;
