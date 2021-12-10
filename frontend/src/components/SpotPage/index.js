import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import BookingForm from "../BookingASpot";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";

import './SpotPage.css'

function Spot() {
    const dispatch = useDispatch();
    const id = useParams().id;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [dispatch])

    const spot = useSelector(state => {
        if (state.spots.currentSpot) {
            return state.spots.currentSpot
        }
    })
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })

    if (spot) {

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
                <div>
                    {!userId && (
                        <>
                        <button onClick={e => setShowModal(true)}>Log in to book this spot.</button>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                              <LoginForm />
                            </Modal>
                          )}
                        </>
                    )}

                    {(userId && !(spot.hostId === userId)) && (
                        <BookingForm />
                    )}

                    {(spot.hostId === userId) && (
                        <div>
                            <p>Your spot is online and accepting bookings.</p>
                        </div>
                    )}
                    {/* NEED WAY TO SHOW YOU ALREADY HAVE A BOOKING FOR A SPOT */}
                </div>
            </div>
        )
    } else return (<p></p>);

}

export default Spot;
