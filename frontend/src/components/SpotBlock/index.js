import React from "react";
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom'

import './SpotBlock.css'

function SpotBlock({ spot }) {
    const sessionUserId = useSelector((state) => state.session.user.id);

    return (
        <div
        key={spot.id}
        className="spot-block"
        >
            <NavLink to={`/spots/${spot.id}`}>
                <div className='spot-block-img-block'>
                    {spot.profileImg && (
                        <img alt={spot.description} src={spot.profileImg} className="spot-block-img"/>
                    )}
                    {!spot.profileImg && (
                        <img alt='default' src={'https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'} className="spot-block-img"/>
                    )}
                </div>
            </NavLink>
            <div className="spot-block-text">
                <h2 className="spot-block-location">{spot.city}, {spot.state}</h2>
                <p className="spot-block-price">${spot.pricePerNight} / night</p>
            </div>

            <NavLink to={`/spots/${spot.id}/update`}>
                {spot.hostId === sessionUserId && (
                <div>
                    <p>This is your spot! Update?</p>
                </div>
                )}
            </NavLink>
        </div>
    )
}

export default SpotBlock;
