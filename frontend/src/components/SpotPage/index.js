import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as imageActions from "../../store/images";
import BookingForm from "../BookingASpot";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import NewSpotImage from "../NewSpotImage";

import './SpotPage.css'

function Spot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const id = useParams().id;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
        dispatch(imageActions.getAllSpotImages(id))
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

    const images = useSelector(state => {
        if (state.images) {
            return state.images;
        }
    })

    console.log(images[1])

    if (spot) {
        return (
            <>
                <div id='spot-page-container'>
                    <div id='explore-banner-div'>
                        <h2 id='explore-banner'>Explore</h2>
                    </div>
                    <div key={`spot-block-${spot.id}`} id="spot-container">
                        <div>
                            <h2 id='spot-title'>{spot.description}</h2>
                            <h3>{spot.address} {spot.city}, {spot.state}</h3>
                        </div>
                        <div id='images-container'>
                            {spot.profileImg && (
                                <img alt={spot.description} src={spot.profileImg} id='spot-page-main-img' />
                            )}
                            {!spot.profileImg && (
                                <img alt='default' src={'https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'} className="spot-block-img" />
                            )}
                            <div id='other-images'>
                                {images && (
                                    <img id='img1' src={images[1].image}></img>
                                )}
                                <div id='img2'></div>
                                <div id='img3'></div>
                                <div id='img4'></div>
                            </div>
                            {spot.hostId === userId && (
                                <div>
                                    <NewSpotImage />
                                </div>
                            )}

                        </div>
                        <div id='all-info-container'>
                            <div id='spot-page-location-info'>
                                <div id='room-info'>
                                    <p>Bedrooms: {spot.bedrooms}</p>
                                    <p>•</p>
                                    <p>Beds: {spot.beds}</p>
                                    <p>•</p>
                                    <p>Bathrooms: {spot.bathrooms}</p>
                                </div>
                                <p id='price'>${spot.pricePerNight} / night</p>
                                <p>Amenities: {spot.amenities}</p>
                            </div>
                            <div id='book-this-spot-container'>
                                {!userId && (
                                    <>
                                        <button id='logged-out-booking' onClick={e => setShowModal(true)}>Log in to book this spot.</button>
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
                                    <div id='hosts-spot'>
                                        <p id='hosts-spot-text'>Your spot is online and accepting bookings.</p>
                                    </div>
                                )}
                                {/* NEED WAY TO SHOW YOU ALREADY HAVE A BOOKING FOR A SPOT */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else return (<p></p>);

}

export default Spot;
