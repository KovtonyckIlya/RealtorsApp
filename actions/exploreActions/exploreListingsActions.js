import _ from 'lodash';
import axios from 'axios';
import { API_URL } from '@env';

const API = axios.create({
    baseURL: `${API_URL}/listings`,
});
// const LISTING = axios.create({
//     baseURL: `${API_URL}/listing`,
// });
export const getListingsListFromBounds = (params) => async (
    dispatch,
    getState
) => {
    const { explore, users } = getState();
    const userLocation = users.location || {};
    const { bounds, page, pageSize } = params;
   console.log("page",page)
    dispatch({
        type: 'exploreListings/SET_LOADING',
        payload: true,
    });

    const resp = await API.get('/from-bounds', {
        params: {
            ...explore.exploreFilters,
            alat: bounds.ne.lat,
            alng: bounds.ne.lng,
            blat: bounds.sw.lat,
            blng: bounds.sw.lng,
            page,
            pageSize,
            ...userLocation,
        },
    })
    const { items, itemsTotal } = resp.data;

    console.log("itemsTotal",itemsTotal) //
    resp.status == 200 &&
    dispatch({
        type: 'exploreListings/FETCH_LISTINGS_LIST_SUCCESS',
        payload: {
             items: items,
            total: items.length,
            page,
        },
    });

};

export const clearListings = () => (dispatch) => {
    dispatch({
        type: 'exploreListings/CLEAR_LISTINGS',
    });
};

export const forceDeselectListings = (v) => (dispatch) => {
  dispatch({
    type: 'exploreListings/DESELECT_MAP_LISTINGS',
    payload: v
  })
}

export const setSelectedListing = (listing) => async (dispatch) => {
    dispatch({
        type: 'exploreListings/SET_SELECTED_LISTING',
        payload: listing,
    });
};

export const getPinFromGeohash = (geohash, pin) => async (dispatch) => {
    // console.log('getPinFromGeohash', geohash);
    try {
        // const resp = await API.get(`/listing/${geohash}`);
        const resp = await API.get('/from-geohash', {
            params: {
                geohash,
            },
        });
        const { items, itemsTotal } = resp.data;
        dispatch(setSelectedListing(resp.data.listing));
        return resp.data.listing;
    } catch (err) {
        console.log('err getPinFromGeohash', err)
    }
};

export const getPinFromAddressId = (addressId, pin) => async (dispatch) => {
    // console.log('getPinFromAddressId', addressId);
    const res = await getPinFromGeohash(addressId)
    try {
        // console.log('addressId', addressId)
        const resp = await API.get(`/from-id?listingId=${addressId}`);
        // console.log('resp.data', JSON.stringify(resp.data));
        dispatch(setSelectedListing(resp.data.listing));
        return resp.data.listing;
    } catch (err) {
        console.log('err', err.response)
    }
};
