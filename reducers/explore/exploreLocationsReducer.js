const initialState = {
    location: null,
};

const exploreLocationsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'locations/GET_LOCATION_SUCCESS':
            return { ...state, location: payload };
        default:
            return state;
    }
};

export default exploreLocationsReducer;
