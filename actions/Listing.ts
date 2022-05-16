import axios from 'axios';
import { API_URL } from '@env';
import { GET_LISTINGS } from '../reducers/actionConstants';

// const getFilters = (filters = {}) => {
//
// });

const setListings = ({ listings, total, loading }) => {
    return {
        type: GET_LISTINGS,
        payload: { listings, total, loading },
    };
};

export const getListings = () => {
    // const getListings = (filters = {}) => {
    return async (dispatch, getState) => {
        console.log('---------0000-----------');
        await dispatch(
            setListings([], getState()?.listingsReducer?.total ?? 0, true)
        );
        try {
            let listingUrl = `${API_URL}/listings/from-bounds?start=true`;
            // `https://simpleshowing.com/api/listings/from-bounds?start=true`;
            // let listingUrl = `https://dev.simpleshowing.com/api/listings/from-bounds?start=true`;
            // const query = {
            //     sortBy: 'Newest+Listings',
            //     propertyType: 'All+Property+Types',
            //     hidePending: true,
            //     page: 1,
            //     pageSize: 16,
            //     lat: 33.769147,
            //     lon: -84.365651,
            //     alat: 33.8876179,
            //     blat: 33.6478079,
            //     blng: 84.5518189,
            //     alng: -84.289389,
            //     zoom: 11,
            // };
            const query1 = getState()?.explore.exploreFilters;
            const query = getState()?.filterReducer.filters;
            // if (Object.keys(filters).length) {
            //     for (let key in filters) {
            //         if (key === 'geo') {
            //             const geo = filters['geo'];
            //             const viewport = geo?.viewport;
            //             query.lat = geo?.location?.lat;
            //             query.lon = geo?.location?.lng;
            //             query.alat = viewport?.northeast?.lat;
            //             query.alng = viewport?.northeast?.lng;
            //             query.blat = viewport?.southwest?.lat;
            //             query.blng = viewport?.southwest?.lng;
            //         } else {
            //             query[key] = filters[key];
            //         }
            //     }
            // }
            // delete query.propertyType;
            for (let key in query) {
                if (query[key] !== null) {
                    listingUrl += `&${key}=${query[key]}`;
                }
            }
            for (let key in query1) {
                if (query1[key] !== null) {
                    listingUrl += `&${key}=${query1[key]}`;
                }
            }

            let res = await axios.get(listingUrl).catch((error) => {
                console.log(error);
                global.Alert(error.toString());
            });
            // console.log('---------res?.data?.items-----------', res);
            await dispatch(
                setListings({
                    listings: res?.data?.items,
                    total: res?.data?.itemsTotal,
                    loading: false,
                })
            );
            return res?.data || [];
            // console.log('fuck');
            // const apiReq = await fetch(hardCodedListingMain, {
            //     method: 'GET',
            // });
            // console.log('fuck1');
            // console.log(apiReq.data);
        } catch (error) {
            global.Alert(error.toString());
            console.error(error);
        }
    };
};

export default { getListings };
