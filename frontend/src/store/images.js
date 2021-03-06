import { csrfFetch } from "./csrf";

export const ADD_IMAGE = 'images/addImage'
export const LOAD_IMAGES = 'images/loadImages'
export const DELETE_IMAGE = 'images/deleteImage'
export const CLEAR_IMAGES = 'images/clearImages'


const addImage = image => {
    return {
        type: ADD_IMAGE,
        payload: image
    }
}


const loadAllImages = images => {
    return {
        type: LOAD_IMAGES,
        payload: images
    }
}


const deleteImage = (image) => {
    return {
        type: DELETE_IMAGE,
        payload: image
    }
}

const clearImageState = () => {
    return {
        type: CLEAR_IMAGES
    }
}


export const addNewImage = newImage => async dispatch => {
    const { userId, spotId, image } = newImage;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("spotId", spotId);
    if (image) formData.append("image", image);

    const response = await csrfFetch('/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    const addedImage = await response.json();
    dispatch(addImage(addedImage));
    return addedImage;
}

export const getAllSpotImages = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${spotId}`)

    if (response.ok) {
        const images = await response.json();
        dispatch(loadAllImages(images));
    }
    return response;
}


export const deleteOneImage = image => async dispatch => {
    const response = await csrfFetch(`/api/images/${image.id}`, {
        method: 'DELETE'
    })
    await dispatch(deleteImage(image));
    return response;
}


export const clearImages = () => async dispatch => {
    await dispatch(clearImageState());
    return 'cleared';
}


const imagesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = {
                ...state,
                [action.payload.newImage.id]: action.payload.newImage
            }
            return newState;
        case LOAD_IMAGES:
            newState = {};
            action.payload.map(image => {
                if (image) {
                    const imageId = image.id;
                    newState[imageId] = action.payload.find(image => image.id === imageId)
                }
            })
            return newState;
        case DELETE_IMAGE:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        case CLEAR_IMAGES:
            return {};
        default:
            return state;
    }
}

export default imagesReducer;
