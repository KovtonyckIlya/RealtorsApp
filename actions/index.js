import { API_URL } from '@env';

export const increment = () => {
    return {
        type: 'INCREMENT',
    };
};
// export const getListings = (filters = {}) => {
//     return {
//         type: 'GET_LISTINGS',
//         payload: filters,
//     };
// };
export const incrementTimes = (times) => {
    return {
        type: 'INCREMENT_TIMES',
        payload: times,
    };
};
export const decrement = () => {
    return {
        type: 'DECREMENT',
    };
};
export const reset = () => {
    return {
        type: 'RESET',
    };
};
export const login = () => {
    return {
        type: 'SIGN_IN',
    };
};
export const logout = () => {
    return {
        type: 'SIGN_OUT',
    };
};

const hardCodedListingMain = `${API_URL}/listings/from-bounds?sortBy=Newest+Listings&propertyType=All+Property+Types&hidePending=true&page=1&pageSize=30&lat=33.769147&lng=-84.365651&alat=33.8876179&blat=33.6478079&blng=-84.5518189&alng=-84.289389`;
// const hardCodedListingMain = `https://dev.simpleshowing.com/api/listings/from-bounds?sortBy=Newest+Listings&propertyType=All+Property+Types&hidePending=true&page=1&pageSize=30&lat=33.769147&lng=-84.365651&alat=33.8876179&blat=33.6478079&blng=-84.5518189&alng=-84.289389`;

export function getListings() {
    // console.log('fuck');
    return async (dispatch) => {
        try {
            const apiReq = await fetch(hardCodedListingMain, {
                method: 'GET',
            });
            // console.log(apiReq);
            await dispatch(setListings(apiReq));
            return apiReq || [];
        } catch (error) {
            global.Alert(error.toString());
            console.error(error);
        }
    };
}
