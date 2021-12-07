import React from "react";

import './SpotBlock.css'

function SpotBlock({ spot }) {
    return (
        <div key={spot.id} className="spot-block">
            <div className='spot-block-img-block'>
                <img src={spot.profileImg} className="spot-block-img"/>
            </div>
            <div className="spot-block-text">
                <h2 className="spot-block-location">{spot.city}, {spot.state}</h2>
                <p className="spot-block-price">${spot.pricePerNight} / night</p>
            </div>
        </div>
    )
}

export default SpotBlock;
