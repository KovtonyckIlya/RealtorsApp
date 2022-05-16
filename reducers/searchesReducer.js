import {
    GET_SEARCHES_SUCCESS,
    DELETE_SEARCH,
} from '@app/reducers/actionConstants';

const initialState = {
    searches: [],
    // searches: {},
};

const searchesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SEARCHES_SUCCESS:
            return { ...state, searches: payload };
        case 'searches/UPDATE_SEARCH_SUCCESS':
            const index = state.searches.findIndex(
                (item) => Object.keys(item) === payload._id
            );
            state.searches[index] = payload;
            return { ...state, searches: [...state.searches] };
        // return { ...state, searches: { ...state.searches } };
        case DELETE_SEARCH:
            const indexDelete = state.searches.findIndex(
                (item) => Object.keys(item)[0] === payload
            );
            state.searches.splice(indexDelete, 1);
            return { ...state, searches: [...state.searches] };
        // return { ...state, searches: { ...state.searches } };
        default:
            return state;
    }
};

export default searchesReducer;
