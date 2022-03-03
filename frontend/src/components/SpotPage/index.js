import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useParams } from "react-router-dom";
import * as imageActions from "../../store/images";
import BookingForm from "../BookingASpot";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import NewSpotImage from "../NewSpotImage";
import Carousel, { CarouselItem } from '../Carousel'

import './SpotPage.css'

function Spot() {
    const location = useLocation();
    const spot = location.state.spot;
    const [showModal, setShowModal] = useState(false);


    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })

    const spotAmenitiesArray = spot?.amenities.split(', ')

    if (spot.images.length < 2) {
        let leftArrow = document.getElementById('click-left');
        let rightArrow = document.getElementById('click-right');

        setTimeout(() => {
            leftArrow?.remove();
            rightArrow?.remove();
        }, 0)
    }

    const spotProfileImage = {
        'userId': spot?.hostId,
        'spotId': spot?.id,
        "image": spot?.profileImg,
        "profileImg": true
    }

    if (spot) {
        return (
            <>
                <div id='explore-banner-div'>
                    <h2 id='explore-banner'>Explore</h2>
                </div>
                <div id='spot-page-container'>
                    <div key={`spot-block-${spot.id}`} id="spot-container">
                        <div>
                            <h2 id='spot-title'>{spot.description}</h2>
                            <h3>{spot.address} {spot.city}, {spot.state}</h3>
                        </div>
                        <div id='images-container'>
                            {!spot.profileImg && (
                                <img alt='default' src={'https://ebenezersuites.com/wp-content/uploads/2016/06/airbnb-logo-266x300@2x.png'} className="spot-block-img" />
                            )}
                            <div id='other-images'>
                                {spot.images && (
                                    <Carousel>
                                        <CarouselItem image={spotProfileImage}></CarouselItem>
                                        {spot.images.map(image => {
                                            return (
                                                <CarouselItem image={image}></CarouselItem>
                                            )
                                        })}
                                    </Carousel>
                                )}
                            </div>
                            {spot.hostId === userId && (
                                <div className='new-image-form'>
                                    <p id='want-to-upload'>Want to upload a new image?</p>
                                    <NewSpotImage />
                                </div>
                            )}

                        </div>
                        <div id='all-info-container'>
                            <div id='spot-page-location-info'>
                                <div id='price-and-description' >
                                    <div id='price-container'>
                                        <p id='price'>${spot.pricePerNight} </p>
                                        <p id='per-night'>/ night</p>
                                    </div>
                                    <div>
                                        <div id='room-info'>
                                            <p>Bedrooms: {spot.bedrooms}</p>
                                            <p>•</p>
                                            <p>Beds: {spot.beds}</p>
                                            <p>•</p>
                                            <p>Bathrooms: {spot.bathrooms}</p>
                                        </div>
                                        <div id='desc-container'>
                                            <p id='spot-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                                <div id='amenities-container'>
                                    <p id='amenities-title'>Amenities:</p>
                                    <ul id='amenity-list'>
                                        {spotAmenitiesArray && (
                                            spotAmenitiesArray.map(amenity => {
                                                return (<li>{amenity}</li>)
                                            })
                                        )}
                                    </ul>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else return (<p></p>);

}

export default Spot;
