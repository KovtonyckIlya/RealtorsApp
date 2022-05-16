import { combineReducers } from 'redux';
import exploreListings from './exploreListingsReducer';
import exploreFilters from './exploreFiltersReducer';
import exploreMap from './exploreMapReducer';
import exploreLocations from './exploreLocationsReducer';
import explore from './exploreReducer';

export default combineReducers({
    explore,
    exploreListings,
    exploreFilters,
    exploreMap,
    exploreLocations,
});
