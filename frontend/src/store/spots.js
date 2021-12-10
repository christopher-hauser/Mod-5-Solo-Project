import { csrfFetch } from "./csrf";

export const ADD_SPOT = 'spots/addSpot'
export const LOAD_ALL_SPOTS = 'spots/getAllSpots'
export const GET_SPOT = 'spots/getSpot'
export const UPDATE_SPOT = 'spots/updateSpot'
export const DELETE_SPOT = 'spots/deleteSpot'

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

const getSpot = spot => {
    return {
        type: GET_SPOT,
        payload: spot
    }
}

const updateSpot = spot => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

const deleteSpot = () => {
    return {
        type: DELETE_SPOT,
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

export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)


    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpot(spot));
    }
    return response;
}

export const updateOneSpot = (updatedSpot) => async dispatch => {
    const { id, hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = updatedSpot;
    console.log(id);
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
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
    dispatch(updateSpot(spot));
    return spot;
}

export const deleteOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    await dispatch(deleteSpot());
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
            newState = {};
            action.payload.map((spot) => {
                const spotId = spot.id;
                return newState[spotId] = action.payload.find(spot => spot.id === spotId)
            })
            return newState;
        case GET_SPOT:
            newState = {
                ...state,
                currentSpot: action.payload
            };
            return newState;
        case UPDATE_SPOT:
            newState = action.payload;
            return newState;
        case DELETE_SPOT:
            return {};
        default:
            return state;
    }
}

export default spotsReducer;
