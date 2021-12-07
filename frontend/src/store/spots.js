import { csrfFetch } from "./csrf";

export const ADD_SPOT = 'spots/addSpot'
export const LOAD_ALL_SPOTS = 'spots/getAllSpots'
// export const GET_SPOT = 'spots/getSpot'
// export const UPDATE_SPOT = 'spots/updateSpot'
// export const DELETE_SPOT = 'spots/deleteSpot'

// ACTIONS

const addSpot = spot => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

const loadAllSpots = spots => {
    return {
        type: LOAD_ALL_SPOTS,
        payload: spots
    }
}

// THUNK ACTIONS

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

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAllSpots(spots))
    }
    return response;
}

//REDUCER

const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_SPOT:
            newState = {
                ...state,
                [action.payload.spot.id]: action.payload.spot
            }
            return newState;
        case LOAD_ALL_SPOTS:
            newState = action.payload
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
