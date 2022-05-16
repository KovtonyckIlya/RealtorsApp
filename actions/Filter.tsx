const setFilters = (data) => {
    return {
        type: 'SET_FILTERS',
        payload: data,
    };
};
const setFiltersGeo = (data) => {
    return {
        type: 'SET_FILTERS_GEO',
        payload: data,
    };
};

const clearFilters = () => {
    return {
        type: 'CLEAR_FILTERS',
    };
};

const getFilters = () => {
    return {
        type: 'GET_FILTERS',
    };
};

export default { getFilters, setFilters, setFiltersGeo, clearFilters };
