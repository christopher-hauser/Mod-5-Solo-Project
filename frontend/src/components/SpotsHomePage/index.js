import React from "react";
import SpotBlock from "../SpotBlock";

import './SpotsHomePage.css';

function SpotsHomePage({ spots }) {
    if (spots.spots['currentSpot']) {
        delete spots.spots['currentSpot'];
    }

    if (spots.spots['updatedSpot']) {
        delete spots.spots['updatedSpot'];
    }

    let spotsArr = Object.values(spots.spots);

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
