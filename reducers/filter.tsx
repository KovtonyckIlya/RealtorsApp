import * as _ from 'lodash';
const filterValues = {
    sortBy: [
        {
            value: 'Highest Price',
            title: 'Highest Price',
        },
        {
            value: 'Lowest Price',
            title: 'Lowest Price',
        },
        {
            value: 'Newest Listings',
            title: 'Newest Listings',
        },
        {
            value: 'Largest Sqft',
            title: 'Largest Sqft',
        },
        {
            value: 'Most Bedrooms',
            title: 'Most Bedrooms',
        },
        {
            value: 'Most Bathrooms',
            title: 'Most Bathrooms',
        },
    ],
    propertyTypes: [
        {
            value: 'All Property Types',
            title: 'All Property Types',
        },
        {
            value: 'houses',
            title: 'Houses Only',
        },
        {
            value: 'condos',
            title: 'Condos / Townhomes Only',
        },
    ],
    bathsMin: [
        {
            title: 'Any',
            value: 'any',
        },
        {
            title: '1+',
            value: '1',
        },
        {
            title: '2+',
            value: '2',
        },
        {
            title: '3+',
            value: '3',
        },
        {
            title: '4+',
            value: '4',
        },
        {
            title: '5+',
            value: '5',
        },
    ],
    houseAge: [
        {
            value: 'any',
            title: 'Any',
        },
        {
            value: '1',
            title: '1 year',
        },
        {
            value: '2',
            title: '2 years',
        },
        {
            value: '3',
            title: '3 years',
        },
        {
            value: '4',
            title: '4 years',
        },
        {
            value: '5',
            title: '5 years',
        },
    ],
    bedsMin: [
        {
            title: 'Any',
            value: 'any',
        },
        {
            title: '1+',
            value: '1',
        },
        {
            title: '2+',
            value: '2',
        },
        {
            title: '3+',
            value: '3',
        },
        {
            title: '4+',
            value: '4',
        },
        {
            title: '5+',
            value: '5',
        },
    ],
    priceMin: [100, 150, 200, 250, 300, 350, 400, 450],
    priceMax: [150, 200, 250, 300, 350, 400, 450, 500],
};

const initialState = {
    filters: {
        // sortBy: 'Newest+Listings',
        propertyType: 'All Property Types',
        hidePending: true,
        hideNewConstruction: true,
        useExactMatchForBedrooms: true,
        page: 1,
        pageSize: 16,
        lat: 33.769147,
        lon: -84.365651,
        alat: 33.8876179,
        blat: 33.6478079,
        blng: 84.5518189,
        alng: -84.289389,
        zoom: 11,
    },
    filterValues,
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FILTERS':
            return {
                ...state,
            };
        case 'SET_FILTERS_GEO':
            const geo = action.payload;
            if (!Object.keys(geo).length) {
                return {
                    ...state,
                };
            }
            const viewport = geo?.viewport;
            const query = {};
            query.lat = geo?.location?.lat;
            query.lon = geo?.location?.lng;
            query.alat = viewport?.northeast?.lat;
            query.alng = viewport?.northeast?.lng;
            query.blat = viewport?.southwest?.lat;
            query.blng = viewport?.southwest?.lng;
            // console.log(
            //     'GEOGEOGEO*********',
            //     {
            //         ...state,
            //         ...query,
            //     },
            //     '*******GEOGEOGEO'
            // );
            return {
                ...state,
                filters: { ...state.filters, ...query },
            };
        case 'CLEAR_FILTERS':
            return initialState;
        case 'SET_FILTERS':
            const keys = Object.keys(action.payload);
            // console.log(
            //     '*****************',
            //     state[keys[0]],
            //     keys[0],
            //     action.payload[keys[0]],
            //     '*****************'
            // );
            if (
                state.filters[keys[0]] !== undefined &&
                action.payload[keys[0]] == state.filters[keys[0]]
            ) {
                // const newObj = Object.assign({}, state);
                // delete newObj[keys[0]];
                // return newObj;
                return {
                    ...state,
                    filters: _.omit(state.filters, [keys[0]]),
                };
            } else {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        ...action.payload,
                    },
                };
            }
        default:
            return state;
    }
};
export default filterReducer;
