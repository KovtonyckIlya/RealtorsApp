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
    baseURL: `${API_URL}/auth`,
    withCredentials: true,
    validateStatus: false,
});

//This should probably be moved to usersActions, or the endpoint should be moved to /auth/users/update-profile
const updateAPI = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
    validateStatus: false,
});

export const logout = () => async (dispatch) => {
    try {
        await API.get('/logout'); //invalidate session
        // firebase.auth().signOut();
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: { user: null },
        });
    } catch (e) {
        console.error('2 ERROR logout---->', e);
    }
};
export const clearError = () => {
    return {
        type: SET_ERROR,
        payload: { error: null },
    };
};
export const clearMessage = () => {
    return {
        type: SET_MESSAGE,
        payload: { message: null },
    };
};

interface PropsCreateAccount {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    type?: string;
}
export const createAccount = (userData: PropsCreateAccount, callback?: () => void) => async (
    dispatch
) => {
    try {
        console.log("signup", userData)
        const resp = await API.post('/create-account-withpass', userData);
        const { user, error } = resp.data;
        console.log('resp.data', resp)
        if (error) {
            dispatch({
                type: SET_ERROR,
                payload: { error: error },
            });
            console.error('1ERROR createAccount---->', error);
        } else if (user) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { user },
            });
            if (callback) callback();
        }
    } catch (e) {
        console.error('2ERROR createAccount---->', e);
    }
};
interface PropsUpdateProfile {
    firstName: string;
    lastName: string;
    phone: string;
}
export const updateProfile = (userData: PropsUpdateProfile) => async (
    dispatch
) => {
    console.log(userData)
    try {
        const resp = await updateAPI.put('/user/update-profile', userData);
        const { user, error } = resp.data;
        await console.log(resp)
        if (error) {
            dispatch({
                type: SET_ERROR,
                payload: { error: error },
            });
            console.error('1ERROR updateProfile---->', error);
        } else if (user) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { user },
            });
        }
    } catch (e) {
        console.error('2ERROR updateProfile---->', e);
    }
};
interface PropsLogin {
    email: string;
    password: string;
}
export const login = ({ email, password }: PropsLogin) => async (dispatch:any) => {
    try {
        const resp = await API.post('/login-withpass', { email, password }, { timeout: 5000 });
        const { error, user } = resp.data;

        if (error) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { user },
            });
            console.log('resp.data543534534543', resp)
            console.error('1ERROR login---->', error);
        } else if (user) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { user },
            });
        }
    } catch (e) {
        dispatch({
            type: SET_ERROR,
            payload: { error: typeof e === 'string' ? e : 'Invalid email or password' },
        });
        console.error('ERROR login---->', e);
    }
};
// interface PropsForgot {
//     email: string;
// }
// export const forgotPassword = ({ email }: PropsForgot) => async (dispatch) => {
//     try {
//         const resp = await API.post('/forgot', { email });
//         console.log('1 forgotPassword---->resp', resp);
//         const { error, message } = resp.data;
//         if (error) {
//             dispatch({
//                 type: SET_ERROR,
//                 payload: { error: error },
//             });
//         } else if (message) {
//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: { message },
//             });
//         }
//     } catch (e) {
//         console.error('ERROR forgotPassword---->', e);
//     }
// };
