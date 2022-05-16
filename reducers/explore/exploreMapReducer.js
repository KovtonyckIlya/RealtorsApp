const initialState = {
    hoverGeohash: null,
    zoom: null,
    bounds: null,
    mapRef: null,
    searchLocation: null,
    showMap: true,
};

const ExploreMapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'exploreMap/SET_SHOW_MAP':
            return { ...state, showMap: payload };
        case 'exploreMap/ON_IDLE':
            return { ...state, ...payload };
        case 'exploreMap/SET_MAP_REF':
            return { ...state, mapRef: payload };
        case 'exploreMap/CLEAR_PINS':
            return { ...state, pins: {} };
        case 'exploreMap/GET_PINS_SUCCESS':
            return { ...state, pins: payload };
        case 'exploreMap/SET_SEARCH_LOCATION': // set || unset
            console.log('update SET_SEARCH_LOCATION');
            return { ...state, searchLocation: payload };
        case 'exploreMap/TOGGLE_MAP':
            return { ...state, showMap: !state.showMap };
        case 'exploreMap/UPDATE_HOVER_GEOHASH':
            return { ...state, hoverGeohash: payload };
        default:
            return state;
    }
};

export default ExploreMapReducer;
