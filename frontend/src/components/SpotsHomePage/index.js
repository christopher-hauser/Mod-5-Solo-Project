import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import SpotBlock from "../SpotBlock";

import './SpotsHomePage.css';

function SpotsHomePage() {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots);

    useEffect(async () => {
        await dispatch(spotActions.getAllSpots())
        if (!spots) {
            return null;
        }
        return;
    }, [dispatch])

    const spotsArr = Object.values(spots);
    console.log(spotsArr)


    return (
        <main>
            <div className="spots-container">
                {(typeof spotsArr[0] === 'object' && !Array.isArray(spotsArr[0])) && spotsArr.map(spot => {
                    return (
                        <SpotBlock spot={spot} key={spot.id}/>
                    )
                })}
            </div>
        </main>
    )
}

export default SpotsHomePage;
