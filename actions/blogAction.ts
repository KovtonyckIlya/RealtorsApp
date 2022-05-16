import axios from 'axios';
import _ from 'lodash'
import { API_URL } from '@env';
import {
    GET_PROFILE_SUCCESS,
    SET_ERROR,
    SET_MESSAGE,
} from '../reducers/actionConstants';

console.log('API_URL', API_URL)

const API = axios.create({
    baseURL: `${API_URL}/blog`,
    withCredentials: true,
    validateStatus: false,
});

const updateAPI = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    validateStatus: false,
});

// export const getPostAmp = () => async (dispatch:any) =>{
   
//  const resp = await axios.get("/get-post-amp/:slug/")
//  console.log("Resp",resp)
    
// }
export const getPostAmp = () => async (dispatch) => {
    console.log('getSearches');
    const resp = await API.get('/get-post/:slug');
    console.log('222 getSearches', resp);
    if (resp.status == 200) {
        // const array = Object.keys(resp.data.items).map((item) => {
        //     return { [item]: resp.data.items[item] };
        // });

        // dispatch({
        //     type: GET_SEARCHES_SUCCESS,
        //     payload: array,
        // });
    }
};