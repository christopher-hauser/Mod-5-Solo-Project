import { csrfFetch } from "./csrf";

const SESSION_USER = 'session/session_user';
const REMOVE_SESSION = 'session/remove_session';

const setSessionUser = user => {
    return {
        type: 'SESSION_USER',
        payload: user
    }
}

const removeSessionUser = () => {
    return {
        type: 'REMOVE_SESSION',
    }
}

export const loginUser = (user) => async dispatch => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await response.json();
    if (response.ok) {
        dispatch(setSessionUser(data.user))
        return response;
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SESSION_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState

        case REMOVE_SESSION:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;

        default:
            return state;
    }
}

export default sessionReducer;
