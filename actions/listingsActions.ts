import axios from 'axios';
import { API_URL } from '@env';
// import { ,  } from '@app/reducers/actionConstants';
import {
  GET_DETAILS_SUCCESS,
  GET_LISTING_SUCCESS,
  SET_ERROR,
  SET_IS_LOADING,
  GET_MYLISTINGS_SUCCESS
} from '../reducers/actionConstants';

const API = axios.create({
  baseURL: `${API_URL}/listings`,
  withCredentials: true,
  validateStatus: false,
});


export const shareListing = (data) => async (dispatch) => {
  const resp = await API.post('/share', data);
};

// /listings/address-id
interface PropsGetHouseInfo {
  addressId: string;
}
export const getHouseInfo = ({ addressId }: PropsGetHouseInfo) => async (
  dispatch
) => {
  try {
    // console.log('API_URL!', API_URL)
    dispatch({
      type: SET_IS_LOADING,
      payload: { isLoadingDetails: true },
    });

    const resp = await API.get(`/from-id?listingId=${addressId}`);
    const { error, listing, relatedListings } = resp.data;

    if (error) {
      dispatch({
        type: SET_ERROR,
        payload: { error: error },
      });
      dispatch({
        type: GET_DETAILS_SUCCESS,
        payload: { detailsHome: null },
      });
      console.error('1ERROR getHouseInfo---->', error);
    } else if (listing) {
      // console.log('2  getHouseInfo -', listing);
      dispatch({
        type: GET_DETAILS_SUCCESS,
        payload: { detailsHome: listing, relatedListings: relatedListings },
      });
      return listing
    }
  } catch (e) {
    console.error('ERROR getHouseInfo---->', e);
  }
};



export const searchMyListings = (page, searchText) => async (dispatch, getState) => {
  const { order, columnKey } = getState().listingsReducer.sorter;
  dispatch({ type: 'listings/IS_LOADING' });
  const resp = await API.get('/my-listings', {
    params: {
      searchText,
      sortOrder: order,
      sortColumn: columnKey,
    },
    withCredentials: true,
  });
  const { total, items } = resp.data;
  dispatch({
    type: GET_MYLISTINGS_SUCCESS,
    payload: {
      total,
      items,
    },
  });
};

export const clearListings = () => async dispatch => {
  dispatch({
    type: GET_MYLISTINGS_SUCCESS,
    payload: {
      total: 0,
      items: {},
    },
  });
};
