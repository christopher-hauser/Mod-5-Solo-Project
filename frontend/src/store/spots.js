import { csrfFetch } from "./csrf";

export const ADD_SPOT = 'spots/addSpot'
export const GET_ALL_SPOTS = 'spots/getAllSpots'
export const GET_SPOT = 'spots/getSpot'
export const UPDATE_SPOT = 'spots/updateSpot'
export const DELETE_SPOT = 'spots/deleteSpot'

const addSpot = spot => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

export const addNewSpot = newSpot => async dispatch => {
    const { hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = newSpot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hostId,
            address,
            city,
            state,
            pricePerNight,
            bedrooms,
            beds,
            bathrooms,
            description,
            amenities,
            profileImg
        })
    });
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
}

const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_SPOT:
            newState = {
                ...state,
                [action.payload.spot.id]: action.payload.spot
            }
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
