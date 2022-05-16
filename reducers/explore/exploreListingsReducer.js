const initialState = {
    listings: {},
    pageSize: 25,
    page: 1,
    loading: true,
    total: 0,
    selectedListing: null,
    searchText: '',
    deselectListingFlag: 0
};

const ExploreListingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'exploreListings/CLEAR_LISTINGS':
            return {
                ...state,
                total: 0,
                page: 1,
                loading: false,
                listings: {},
            };
        case 'exploreListings/SET_LOADING':
            return { ...state, listings: {}, loading: payload };
        case 'exploreListings/FETCH_LISTINGS_LIST_SUCCESS':
            console.log("FETCH_LISTINGS_LIST_SUCCESS",payload.total)
            return {
                ...state,
                listings: payload.items,
                total: payload.total,
                page: payload.page,
                loading: false,
            };
        case 'exploreListings/DESELECT_MAP_LISTINGS':
            return {
              ...state,
              deselectListingFlag: payload
            }
        case 'exploreListings/SET_SELECTED_LISTING':
            return {
                ...state,
                selectedListing: payload,
            };
        case 'exploreListings/SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: payload,
            };
        default:
            return state;
    }
};

export default ExploreListingsReducer;
