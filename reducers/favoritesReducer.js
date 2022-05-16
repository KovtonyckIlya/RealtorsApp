import {
    GET_FAVORITES_IDS_FAILURE,
    GET_FAVORITES_IDS_SUCCESS,
    GET_FAVORITES_LISTINGS_SUCCESS,
    GET_FAVORITES_ID
} from '@app/reducers/actionConstants';

const initialState = {
    favorites: {},
    favoritesID:{}
};

const favoritesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'favorites/UPDATE_FAVORITE_ID':
            let favorites = state.favorites;
            if (state.favorites[payload.listingId]) {
                delete favorites[payload.listingId];
                favorites = {
                    ...favorites,
                };
            } else {
                favorites = {
                    ...favorites,
                    [payload.listingId]: new Date(),
                };
            }
            return {
                ...state,
                favorites,
            };
        case GET_FAVORITES_IDS_SUCCESS:
            return { ...state, favorites: { ...state.favorites, ...payload } };
            case GET_FAVORITES_ID:
                // console.log("GET_FAVORITES_ID",favorites)
                return {
                    ...state,
                    favoritesID: payload,
                };
        case GET_FAVORITES_IDS_FAILURE:
            delete state.favorites[payload];
            return { ...state, favorites: { ...state.favorites } };
        case GET_FAVORITES_LISTINGS_SUCCESS:
            console.log("GET_FAVORITES_LISTINGS_SUCCESS")
            return {
                ...state,
                favorites: payload,
            };
        default:
            return state;
    }
};

export default favoritesReducer;
