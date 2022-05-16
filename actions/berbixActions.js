import axios from 'axios';
import { API_URL } from '@env';

const API = axios.create({
    baseURL: `${API_URL}/berbix`,
    withCredentials: true,
});

export const getVerificationStatus = async () => {
    console.log('getVerificationStatus');
    const resp = await API.get('/verification-status');
    return resp.data.status;
};

export const createTransaction = () => async (dispatch) => {
    console.log('createTransaction');
    const response = await API.get('/create-transaction');
    return response.data;
};
