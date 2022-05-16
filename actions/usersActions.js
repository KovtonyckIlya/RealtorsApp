import _ from 'lodash';
import axios from 'axios';
import { API_URL } from '@env';
import { GET_PROFILE_SUCCESS } from '../reducers/actionConstants';

const API = axios.create({
    baseURL: `${API_URL}/user`,
});

export const getProfile = () => async (dispatch) => {
  
    const resp = await API.get('/profile', {
        withCredentials: true,
    });
    console.log("respUser",resp)
    dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: { user: _.isEmpty(resp.data) ? null : resp.data },
    });
};
export const updateUserLocation = (location) => async (dispatch,getState) => {
    let data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
    };
   
    const resp = await API.post('/update-location', {
       ...data
    });
    console.log("resp",resp)
};
export const getUserLocation = (address) => async (dispatch) => {
    const resp = await API.get('/get-location', {
        params: { address },
    });
    dispatch({
        type: 'locations/GET_LOCATION_SUCCESS',
        payload: resp.data.location,
    });

    dispatch({
        type: 'exploreListings/SET_SEARCH_TEXT',
        payload: resp.data.location.formatted_address.replace(', USA', ''),
    });
};
