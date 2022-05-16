const initialState = {
    title: null,
    mapCenter: null,
};

const ExploreReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'explore/SET_TITLE':
            return { ...state, title: payload };

        default:
            return state;
    }
};

export default ExploreReducer;
