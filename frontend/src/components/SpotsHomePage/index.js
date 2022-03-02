import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpotBlock from "../SpotBlock";
import * as imageActions from "../../store/images";

import './SpotsHomePage.css';

function SpotsHomePage({ spots }) {
    const spotsArr = Object.values(spots.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('triggered UseEffect')
        dispatch(imageActions.clearImages())
    }, [dispatch])

    return (
        <main>
            <div id="banner">
                <h1>Ready for an adventure?</h1>
                <h2>Seek out your one-of-a-kind getaway with Rarebnb.</h2>
            </div>

            <div className="spots-container">
                {(typeof spotsArr[0] === 'object' && !Array.isArray(spotsArr[0])) && spotsArr.map(spot => {
                    return (
                        <SpotBlock spot={spot} key={`spot-${spot.id}`}/>
                    )
                })}
            </div>
        </main>
    )
}

export default SpotsHomePage;
