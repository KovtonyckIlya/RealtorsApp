import _ from 'lodash';
import { UPDATE_FILTER, SHOW_FILTERS } from '@app/reducers/actionConstants';

export const updatePriceRange = (min, max) => (dispatch) => {
    dispatch(updateFilter('priceMin', min));
    dispatch(updateFilter('priceMax', max));
};

export const updateFilter = (key, value) => (dispatch) => {
    if (value == undefined) value = null;

    if (key) {
        dispatch({
            type: UPDATE_FILTER,
            payload: {
                key,
                value,
            },
        });
    }
};

export const updateAllFilters = (data) => (dispatch) => {
    _.keys(data).map((key) => {
        dispatch(updateFilter(key, data[key]));
    });
};

export const setShowFilters = (val) => (dispatch) => {
    dispatch({
        type: SHOW_FILTERS,
        payload: val,
    });
};
