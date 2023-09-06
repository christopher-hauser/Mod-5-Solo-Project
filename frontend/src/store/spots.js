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

const deleteSpot = spotId => {
    return {
        type: DELETE_SPOT,
        payload: spotId
    }
}

// THUNK ACTIONS

export const addNewSpot = newSpot => async dispatch => {
    const { hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = newSpot;
    const formData = new FormData();
    formData.append("hostId", hostId);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pricePerNight", pricePerNight);
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("bathrooms", bathrooms);
    formData.append("description", description);
    formData.append("amenities", amenities);
    if (profileImg) formData.append("profileImg", profileImg);

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
}

//ADD IMAGES TO SPOT
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const spots = await response.json();

        spots.map(async spot => {
            const imageRes = await csrfFetch(`/api/images/${spot.id}`)

            if (imageRes.ok) {
                const images = await imageRes.json();
                spot.images = images;
            }
        })
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
    const { id, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg } = updatedSpot;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pricePerNight", pricePerNight);
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("bathrooms", bathrooms);
    formData.append("description", description);
    formData.append("amenities", amenities);
    if (profileImg) formData.append("profileImg", profileImg);
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    const spot = await response.json();
    dispatch(updateSpot(spot));
    return spot;
}

export const deleteOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    await dispatch(deleteSpot(id));
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
            const updatedSpotId = action.payload.updatedSpot.id;
            newState = { ...state }
            newState[updatedSpotId] = action.payload.updatedSpot;
            return newState;
        case DELETE_SPOT:
            const deletedSpotId = action.payload
            newState = { ...state }
            delete newState[deletedSpotId];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
