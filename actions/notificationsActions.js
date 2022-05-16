import _ from 'lodash';
import axios from 'axios';
import { API_URL } from '@env';
import { GET_PROFILE_SUCCESS } from '../reducers/actionConstants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const API = axios.create({
  baseURL: `${API_URL}/users`,
});

export const sendPushToken = async (token) => {
  console.log(token);
  const resp = await API.post('/update-push-token', { token, deviceType: Platform.OS }, {
    withCredentials: true
  });

  dispatch({
    type: SEND_TOKEN_SUCCESS,
    payload: { token: resp.data }
  });

};
