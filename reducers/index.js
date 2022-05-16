import { combineReducers } from 'redux';
import explore from '@app/reducers/explore';
import leads from '@app/reducers/leadsReducer';
import users from '@app/reducers/usersReducer';
import counterReducer from '@app/reducers/counter';
// import listingReducer from '@app/reducers/listing';
import listingsReducer from '@app/reducers/listingsReducer';
import favoritesReducer from '@app/reducers/favoritesReducer';
import showings from '@app/reducers/showingsReducer';
import filterReducer from '@app/reducers/filter';
import schedule from '@app/reducers/scheduleReducer';
import navigationReducer from '@app/reducers/navigation';
import searchesReducer from '@app/reducers/searchesReducer';
import error from '@app/reducers/errorReducer';

const rootReducer = combineReducers({
    error,
    schedule,
    leads,
    explore,
    users,
    counterReducer,
    showings,
    listingsReducer,
    favoritesReducer,
    filterReducer,
    searchesReducer,
    navigationReducer,
});

export default rootReducer;
