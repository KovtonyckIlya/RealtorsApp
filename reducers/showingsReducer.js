const initialState = {
    sorter: {},
    showings: {},
    showingsIds: {},
    bookAsUser: null,
};

const showingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'showings/CREATE_SHOWING_SUCCESS':
            return { ...state, showings };
        case 'showings/GET_SHOWINGS_SUCCESS':
            return { ...state, showings: payload.items, total: payload.total };
        case 'showings/GET_SHOWINGS_IDS_SUCCESS':
            return { ...state, showingsIds: payload };
        case 'showings/UPDATING_SHOWING':
            console.log('UPDATING_SHOWING', payload);
            return {
                ...state,
                showings: {
                    ...state.showings,
                    [payload]: { ...state.showings[payload], loading: true },
                },
            };
        case 'showings/UPDATE_SHOWING_SUCCESS':
            if (state.showing && state.showing.shortId == payload.shortId) {
                state.showing = payload;
            }
            return {
                ...state,
                showings: {
                    ...state.showings,
                    [payload.shortId]: { ...payload, loading: false },
                },
            };
        case 'showings/SET_BOOK_AS_USER':
            return { ...state, bookAsUser: payload };
        default:
            return state;
    }
};

export default showingsReducer;
