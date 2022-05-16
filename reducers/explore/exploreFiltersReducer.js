import {
    CLEAR_FILTERS,
    UPDATE_FILTER,
    SET_FILTERS,
    SHOW_FILTERS,
} from '@app/reducers/actionConstants';

const initialState = {
    priceMin: null,
    priceMax: null,
    bedsMin: null,
    bathsMin: null,
    sortBy: 'Newest Listings',
    propertyType: 'All Property Types',
    hidePending: true,
    hideNewConstruction: true,
    useExactMatchForBedrooms: true,
    searchText: null,
    showFilters: false,
};

const ExploreFiltersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_FILTER:
            return { ...state, [payload.key]: payload.value };
        case SHOW_FILTERS:
            console.log('showFilters');
            return { ...state, showFilters: payload };
        case CLEAR_FILTERS:
            console.log('CLEAR_FILTERS');
            return {
                ...state,
                priceMin: null,
                priceMax: null,
                bedsMin: null,
                bathsMin: null,
                sortBy: 'Newest Listings',
                propertyType: 'All Property Types',
                hidePending: true,
                hideNewConstruction: true,
                useExactMatchForBedrooms: true,
                searchText: null,
            };
        case SET_FILTERS:
            console.log('SET_FILTERS');
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};

export default ExploreFiltersReducer;
