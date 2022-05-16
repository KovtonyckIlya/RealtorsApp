import {
    GET_GEOLOCATION_SUCCESS,
    GET_PROFILE_SUCCESS,
    SET_ERROR,
    SET_MESSAGE,
    SEND_TOKEN_SUCCESS,
    UPDATE_EMAIL_FREQUENCY_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
} from '@app/reducers/actionConstants';

const initialState = {
    user: null,
    location: null,
    error: null,
    message: null,
    token: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GEOLOCATION_SUCCESS:
            return { ...state, location: payload };
        case GET_PROFILE_SUCCESS:
            // console.log('GET_PROFILE_SUCCESS', payload.user);
            // console.log("GET_PROFILE_SUCCESS", location)
            return { ...state, user: payload.user, location: payload.location };
        case SEND_TOKEN_SUCCESS:
            return { ...state, token: payload.token };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, user: payload };
        case UPDATE_EMAIL_FREQUENCY_SUCCESS:
            state.user.searchEmailFrequency = payload;
            return { ...state, user: { ...state.user } };
        case SET_ERROR:
            return { ...state, error: payload.error };
        case SET_MESSAGE:
            return { ...state, message: payload.message };
        default:
            return state;
    }
};
