import axios from 'axios';
import { updateAllFilters } from './exploreActions/exploreFiltersActions';
import { setLandingSearch } from './exploreActions/exploreMapActions';
import { API_URL } from '@env';
import {
    CLEAR_FILTERS,
    DELETE_SEARCH,
    GET_SEARCHES_SUCCESS,
    SET_FILTERS,
} from '../reducers/actionConstants';
import moment from 'moment';
const API = axios.create({
    baseURL: `${API_URL}/searches`,
    withCredentials: true,
    validateStatus: false,
});
 interface deleteSearchUUID {
     uuid?: string;
 }


 
export const saveSearch = () => async (dispatch:any, getState:any) => {
    const {  users } = getState();
    let userData = users.user
    let  _id = {
        _id:userData._id.toString(),
    }
    let user = {
        user:userData._id.toString(),
    }
    let CreatedAt = {
       createdAt:{ data: moment().format(),}
    }
    const {
        explore: {
            exploreFilters,
            exploreMap: { mapRef, bounds },
        },
    } = getState();
    let data = {
        ..._id,
        ...exploreFilters,
        ...user,
        ...CreatedAt,
    };
    if (!!bounds) {
        data = { ...data, box:[
            bounds.sw.lng,
            bounds.sw.lat,
            bounds.ne.lng,
            bounds.ne.lat
        ]};
       
    }
    const resp = await API.post('/save-search', data);
    console.log("Rest",resp)
   
};


export const clearFilters = ({ uuid }: {
    uuid?: string;
}) => async (
    dispatch:any
) => {
        dispatch({
            type: CLEAR_FILTERS,
        });
    };

export const deleteSearch = (search:any) => async (
    dispatch:any,
    getState:any
) => {
    let objId = {
        uuid:search._id
    }
    let data = {
        ...objId,
    }
    const resp = await API.post(`/delete`, data);
    
    console.log("REsp", resp)
    if (resp.status == 200) {
        dispatch({
            type: DELETE_SEARCH,
            payload: resp.data._id,
        });
        
    }
};

export const startSetSearch = () => async (dispatch:any, getState:any) => {
    const {
        searchesReducer: { searches },
    } = getState();
    dispatch({
        type: SET_FILTERS,
        payload: Object.values(searches[0])[0],
    });
};

export const updateSearch = (data:any) => async (dispatch:any) => {
    console.log('updateSearch');
   

    const resp = await API.post('/update-search', {
        ...data,
    
    });
    console.log('resp',resp);
    if  (resp.status == 200) {
        dispatch({
            type: 'searches/UPDATE_SEARCH_SUCCESS',
            payload: data,
        });
    }

   
        
};

export const getSearches = () => async (dispatch:any) => {
    const resp = await API.get('/get-searches');
    console.log("respdata",resp)
    if (resp.status == 200) {
     
        const array = Object.keys(resp.data.items).map((item) => {
            return { [item]: resp.data.items[item] };
        });

        dispatch({
            type: GET_SEARCHES_SUCCESS,
            payload: array,
        });
    }
};

export const applySearch = (search:any) => (dispatch:any) => {
    dispatch(updateAllFilters(search));
    const toString = search.box.join()
    const box = toString.split(',')  
    const SWlat  =  box[1] 
    const SWlng  =  box[0] 
    const NElat  =  box[3] 
    const NElng  =  box[2] 
    dispatch(
        {   
            type: 'exploreMap/SET_SEARCH_LOCATION',
            payload: {
                geometry: {
                    bounds: {
                        northeast: {
                            lat: parseFloat(SWlat),
                            lng: parseFloat(SWlng)
                        },
                        southwest: {
                            lat: parseFloat(NElat),
                            lng: parseFloat(NElng)
                        }
                    }
                }
            }
        });
};
