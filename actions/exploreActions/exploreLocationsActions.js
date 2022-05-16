import axios from 'axios';
import { API_URL } from '@env';

const API = axios.create({
    baseURL: `${API_URL}/locations`,
});

export const getLocation = (address) => async (dispatch) => {
    const resp = await API.get('/get-location', {
        params: { address },
    });
    console.log('go to location', resp.data.location);
    console.log('go to location resp', resp);
    dispatch({
        type: 'locations/GET_LOCATION_SUCCESS',
        payload: resp.data.location,
    });

    dispatch({
        type: 'exploreListings/SET_SEARCH_TEXT',
        payload: resp.data.location.formatted_address.replace(', USA', ''),
    });
};
