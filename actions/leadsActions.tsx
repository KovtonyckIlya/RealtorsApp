import axios from 'axios';
import { API_URL } from '@env';
import _ from 'lodash'

const API = axios.create({ baseURL: `${API_URL}/leads` });

export const getLeads = (page) => async (dispatch, getState) => {
    console.log('getLeads')
    const { order, columnKey } = getState().leads.sorter;
    const resp = await API.get('/my-leads', {
        withCredentials: true,
        params: {
            page,
            sortOrder: order,
            sortColumn: columnKey,
        },
    });
    const { items, total } = resp.data;
    dispatch({
        type: 'leads/FETCH_USERLEADS_SUCCESS',
        payload: {
            items: _.keyBy(items, 'id'),
            total,
        },
    });
};

export const clearLeads = (page) => (dispatch) => {
    dispatch({
        type: 'leads/FETCH_USERLEADS_SUCCESS',
        payload: {
            total: 0,
            items: {},
        },
    });
};

export const updateSorter = (sorter) => (dispatch) => {
    dispatch({
        type: 'leads/UPDATE_SORTER',
        payload: sorter,
    });
};

export const getLead = (id, cookie) => async (dispatch) => {
    const resp = await API.get('/get-lead', {
        withCredentials: true,
        headers: {
            cookie,
        },
        params: {
            id,
        },
    });
    dispatch({
        type: 'leads/FETCH_USERLEAD_SUCCESS',
        payload: resp.data.userlead,
    });
};

export const approveLead = (leadId) => async (dispatch) => {
    console.log('confirmLead', leadId);
    const resp = await API.post(
        '/approve-lead',
        {
            id: leadId,
        },
        { withCredentials: true }
    );
    dispatch({
        type: 'leads/APPROVE_USERLEAD_SUCCESS',
        payload: resp.data.lead,
    });
};

export const declineLead = (leadId) => async (dispatch) => {
    console.log('declineLead');
    const resp = await API.post(
        '/decline-lead',
        {
            id: leadId,
        },
        { withCredentials: true }
    );
    dispatch({
        type: 'leads/DECLINE_USERLEAD_SUCCESS',
        payload: resp.data.lead,
    });
};

export const updateSubStatus = (leadId, substatus) => async (dispatch) => {
    const resp = await API.post(
        '/update-substatus',
        {
            id: leadId,
            substatus,
        },
        { withCredentials: true }
    );

    dispatch({
        type: 'leads/UPDATE_USERLEAD_SUBSTATUS_SUCCESS',
        payload: resp.data.lead,
    });
};

export const submitLead = (formValues, callback) => async (dispatch) => {
    const resp = await API.post(
        '/submit',
        {
            ...formValues,
        },
        { withCredentials: true }
    );
    callback && callback();
};

export const requestDemo = (formValues, callback) => async (dispatch) => {
    const resp = await API.post(
        '/request-demo',
        {
            ...formValues,
        },
        { withCredentials: true }
    );
    callback && callback();
};
