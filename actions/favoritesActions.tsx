import axios from 'axios';
import { API_URL } from '@env';
import {
    GET_FAVORITES_IDS_SUCCESS,
    GET_FAVORITES_LISTINGS_SUCCESS,
    GET_FAVORITES_IDS_FAILURE,
    GET_FAVORITES_ID
} from '../reducers/actionConstants';
import { get } from 'lodash';
import moment from 'moment'

const API = axios.create({
    baseURL: `${API_URL}/favorites`,
    withCredentials: true,
    validateStatus: false,
});

// export const favoriteListing = ({ item }: PropsSetFavoriteById) => async (dispatch) => {
//     const resp = await API.post('/get-favorites-listings',{listingId:item._id});
//     console.log('favoriteListingApp', resp);
//     dispatch({
//         type: 'favorites/UPDATE_FAVORITE_ID',
//         payload: { item },
//     });
// };
interface PropsSetFavoriteById {
    item: any;
}


export const setFavoriteById = ({ item }: PropsSetFavoriteById) => async (
    dispatch:any
) => {
    const itemFavorite = {
        [item.ListingId]: {
                        addressId: item.ListingId,
                        imgURL: item.photos[0].url,
                        price: item.ListPrice,
                        unparsedAddress: item?.address.fulladdress,
                    },
    };
    dispatch({
        type: GET_FAVORITES_IDS_SUCCESS,
        payload: itemFavorite,
    });
    const resp = await API.post('/favorite-listing', { listingId: item._id });
    if (resp.status != 200) {
        dispatch({
            type: GET_FAVORITES_IDS_FAILURE,
            payload: item.addressId,
        });
    }
    if(resp.status === 200){
        dispatch(getFavoriteListings())
    }
};

export const setUnFavoriteById = ({ item }: PropsSetFavoriteById) => async (
    dispatch:any
) => {
   
    const resp = await API.post('/get-favorites-listings', { listingId: item.addressId });
    if (resp.status != 200) {
         const itemFavorite = {
        [item.ListingId]: {
            addressId: item.addressId,
            imgURL: item.imgURL,
            price: item.price,
            unparsedAddress: item?.unparsedAddress,
        },
    };
        dispatch({
            type: GET_FAVORITES_IDS_FAILURE,
            payload: itemFavorite,
        });
    }
    else {
        dispatch({
            type: GET_FAVORITES_IDS_SUCCESS,
            payload: item.addressId,
        });
    }
};


export const getFavoriteListings = () => async (dispatch:any) => {
    const resp = await API.get('/get-favorites-listings');
    // console.log("convertArrayToObject(resp.data.items",convertArrayToObject(resp.data.items, "listing"))
    if (resp.status == 200) {
        dispatch({
            type: GET_FAVORITES_LISTINGS_SUCCESS,
            payload: resp.data.items,
        });

    }
};  

export const getFavoriteListingIds = () => async (dispatch:any) => {
    const resp = await API.get('/get-favorites-ids');
    console.log("resp",resp.data)
    if (resp.status == 200) {
        const array = Object.keys(resp.data.items)
        console.log("array",array)
        dispatch({
            type:GET_FAVORITES_ID,
            payload: array,
        });
    }
};

// export const getFavoriteListings = () => async (dispatch:any) => {
//     const resp = await API.get('/get-favorites-listings');
//     console.log("Ids",resp)
//     if (resp.status == 200) {
//         dispatch({
//             type: GET_FAVORITES_IDS_SUCCESS,
//             payload: convertArrayToObject(resp.data.items,"listing")
//         });
//     }
// };

const convertArrayToObject = (array:any, key:any) => {
    const initialValue = {};
    return array.reduce((obj:any, item:any) => {
        return {
            ...obj,
            [key]: item,
        };
    }, initialValue);
};
