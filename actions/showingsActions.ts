import _ from 'lodash';
import axios from 'axios';
import { API_URL } from '@env';
import { Moment } from 'moment';
import {showError} from './errorActions'
const API = axios.create({
    baseURL: `${API_URL}/showings`,
    withCredentials: true,
    validateStatus: false,
});

interface PropsBookShowing {
    listingId: string;
    startTime: Moment;
    endTime: Moment;
    comments?: string;
}

export const bookShowing = ({
    listingId,
    startTime,
    endTime,
    comments,
}: PropsBookShowing) => async (dispatch) => {
    try {
      console.log('bookShowing',API_URL)
      const resp = await API.post(`/book-showing`, {
          // addressId,
          listingId,
          startTime,
          endTime,
          comments,
      },{withCredentials:true});
      const {error} = resp.data

      if (resp.status == 200) {
        console.log('resp ___>>>', resp.data);
        await dispatch(getShowingsIds());
        const { showing } = resp.data;
        return showing;
      } else if (error) {
        dispatch(showError(error))
      }
    } catch (err) {
      console.log('err', err)
      return Promise.reject(err)
    }
    
};

export const getShowingsIds = () => async (dispatch) => {
    const resp = await API.get('/get-showings-ids');
    resp.status == 200 &&
        dispatch({
            type: 'showings/GET_SHOWINGS_IDS_SUCCESS',
            payload: resp.data.items,
        });
};

export const getRequestedShowings = (page: number, userId: string) => async (dispatch, getState) => {
  try {
    console.log('getRequestedShowings',API_URL, userId, page)
    const { order, columnKey } = getState().showings.sorter;
    const resp = await API.get('/get-tours', {
      params: { userId, page: 3, sortOrder: order, sortColumn: columnKey },
    });
    // return console.log('res.daat', resp.data)
    const { items, total, error } = resp.data;

    if (resp.status == 200) {
      dispatch({
        type: 'showings/GET_SHOWINGS_SUCCESS',
        payload: {
          total,
          // items: _.keyBy(items, 'shortId'),
          items,
        },
      });
    } else if (error) {
      dispatch(showError(error))
    }
  } catch (err) {
    console.log('err', err)
  }
  
    
  };
  
  export const getReceivedShowings = page => async (dispatch) => {
    console.log('getReceivedShowings',API_URL)
    const response = await API.get('/get-received', {
      withCredentials: true,
      params: { page },
    });
    const { items, total } = response.data;
    dispatch({
      type: 'showings/GET_SHOWINGS_SUCCESS',
      payload: {
        total,
        items: _.keyBy(items, 'shortId'),
        // sortOrder: order,
        // sortColumn: columnKey,
      },
    });
  };

  export const confirmShowing = (confirmedTime, shortId) => async dispatch => {
    console.log('confirmShowing',API_URL)
    dispatch({ type: 'showings/UPDATING_SHOWING', payload: shortId });
    const resp = await API.post(
      '/confirm',
      { confirmedTime, shortId },
      { withCredentials: true },
    );
    const { showing } = resp.data;
    dispatch({ type: 'showings/UPDATE_SHOWING_SUCCESS', payload: showing });
  };
  
  export const declineShowing = shortId => async dispatch => {
    console.log('declineShowing',API_URL)
    dispatch({ type: 'showings/UPDATING_SHOWING', payload: shortId });
    const resp = await API.post('/decline', { shortId }, { withCredentials: true });
    const { showing } = resp.data;
    dispatch({ type: 'showings/UPDATE_SHOWING_SUCCESS', payload: showing });
  };


  export const buyerReschedule = (shortId, startTime, endTime) => async dispatch => {
    dispatch({ type: 'showings/UPDATING_SHOWING', payload: shortId });
    const resp = await API.post(
      '/buyer-reschedule',
      {
        shortId,
        startTime,
        endTime,
      },
      { withCredentials: true },
    );
    const { showing } = resp.data;
    dispatch({ type: 'showings/UPDATE_SHOWING_SUCCESS', payload: showing });
  };
  
  export const buyerCancel = shortId => async dispatch => {
    try {
      dispatch({ type: 'showings/UPDATING_SHOWING', payload: shortId });
      console.log('shortId', shortId)
      const resp = await API.post(
        '/buyer-cancel',
        { showingId: shortId },
        {
          withCredentials: true,
        },
      );
      const { showing } = resp.data;
      console.log('resp', resp.data)
      dispatch({
        type: 'showings/UPDATE_SHOWING_SUCCESS',
        payload: showing,
      });
    } catch {}
  };