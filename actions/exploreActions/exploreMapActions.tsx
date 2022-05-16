import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '@env';
// const API_URL = 'http://localhost:4000'
const API = axios.create({
    baseURL: `${API_URL}`,
});

export const setShowMap = (show) => (dispatch) => {
    dispatch({
        type: 'exploreMap/SET_SHOW_MAP',
        payload: show,
    });
};

export const onIdle = (bounds, zoom) => async (dispatch) => {
    dispatch({
        type: 'exploreMap/ON_IDLE',
        payload: {
            bounds,
            zoom,
        },
    });
};

export const setMapRef = (ref) => async (dispatch) => {
    dispatch({
        type: 'exploreMap/SET_MAP_REF',
        payload: ref,
    });
};

export const setMapCenter = (location) => (dispatch, getState) => {
    const ref = getState().explore.exploreMap.mapRef;
    ref && ref.setCenter(location);
};

export const setMapZoom = (zoom) => (dispatch, getState) => {
    const ref = getState().explore.exploreMap.mapRef;
    ref && ref.setZoom(zoom);
};

export const moveBoundsToPins = () => (dispatch, getState) => {
    const { pins, mapRef } = getState().explore.exploreMap;
    if (!mapRef) return;
    const bounds = new google.maps.LatLngBounds();
    Object.keys(pins).map((key) => {
        const pin = pins[key];
        const { lat, lng } = pin.location;
        bounds.extend({ lat, lng });
    });
    // mapRef.fitBounds(bounds);
};

export const getClusterPins = () => async (dispatch, getState) => {
    console.log('getClusterPins', API_URL)
    const { explore } = getState();
    const bounds = explore.exploreMap.bounds;
    const zoom = explore.exploreMap.zoom;
    if (!bounds || !zoom) return;


    let expandLat = Math.abs(bounds.ne.lat - bounds.sw.lat) / 4
    let expandLng = Math.abs(bounds.ne.lng - bounds.sw.lng) / 4

    const resp = await API.get(`/pins/cluster`, {
        params: {
            alat: bounds.ne.lat + expandLat,
            alng: bounds.ne.lng + expandLng,
            blat: bounds.sw.lat - expandLat,
            blng: bounds.sw.lng - expandLng,
            zoom,
            ...explore.exploreFilters,
        },
    }).catch(({ message }) => {
        console.log('error exploreFilters getClusterPins', message);
    });
    // console.log('resp', resp)
    const { items } = resp.data;

    resp.status == 200 &&
        dispatch({
            type: 'exploreMap/GET_PINS_SUCCESS',
            payload: _.keyBy(items, '_id'),
        });
};

export const clearPins = () => (dispatch) => {
    dispatch({
        type: 'exploreMap/GET_PINS_SUCCESS',
        payload: {},
    });
};

export const setSearchLocation = (data) => (dispatch, getState) => {
    console.log('setSearchLocation');
    dispatch({
        type: 'exploreMap/SET_SEARCH_LOCATION',
        payload: data,
    });
};

export const toggleMap = () => (dispatch) => {
    dispatch({
        type: 'exploreMap/TOGGLE_MAP',
    });
};

export const updateHoverGeohash = (geohash) => (dispatch) => {
    dispatch({
        type: 'exploreMap/UPDATE_HOVER_GEOHASH',
        payload: geohash,
    });
};
