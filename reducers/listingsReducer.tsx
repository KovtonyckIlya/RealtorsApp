// type listingType = {
//     BathroomsTotalDecimal:string
//     BedroomsTotal:number,
//     ListOfficeKey:string
//     ListPrice:number,
//     ListingId:number,
//     LivingArea:number,
//     Media": Array [
//     Object {
//     createdAt:string,
//         id:number,
//         listingId:number,
//         order:number,
//         updatedAt:string,
//         url:string,
// },
// ],
//     StandardStatus:string,
//     UnparsedAddress:string,
//     addressId:string,
//     createdAt:string,
//     id:number,
//     latitude:number,
//     lockboxes": Array [],
//     longitude:number,
//     paiduser:boolean,
//     street_number:string,
// }

import {
    GET_DETAILS_SUCCESS,
    GET_LISTING_SUCCESS,
    GET_LISTINGS,
    SET_IS_LOADING,
    GET_MYLISTINGS_SUCCESS
} from '../reducers/actionConstants';

const initialState = {
    redirect: null,
    listing: null,
    detailsHome: null,
    relatedListings: {},
    loading: true,
    isLoadingDetails: true,
    total: 0,
    listings: [],
    error: false,
    sorter: {}
};

const listingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LISTING_SUCCESS:
            console.log('GET_LISTING_SUCCESS - ', payload.listing);
            return {
                ...state,
                listing: payload.listing,
            };
        case GET_DETAILS_SUCCESS:
            // console.log('0000000000000000===================----* - ');
           
            return {
                ...state,
                detailsHome: payload.detailsHome,
                isLoadingDetails: false,
                loading: false, 
                ListingId: payload.listingId,
                relatedListings: payload.relatedListings,
                // relatedListings: payload.relatedListings,
            };
        case GET_LISTINGS:
            console.log('GET_LISTING_SUCCESS - ', payload.listings);
            console.log('GET_LISTING_SUCCESS -ListingId ', payload.listingId);
            console.log('GET_LISTING_SUCCESS -loading', payload.loading);
            console.log('GET_LISTING_SUCCESS -total', payload.total);
            return {
                ...state,
                ListingId: payload.listingId,
                listings: payload.listings,
                total: payload.total ?? state.total,
                loading: payload.loading ?? false,
            };
        case GET_MYLISTINGS_SUCCESS:
            console.log('GET_MYLISTINGS_SUCCESS - ', payload.items);
            return { ...state, listings: payload.items, total: payload.total };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoadingDetails: payload.isLoadingDetails,
            };
        default:
            return state;
    }
};

export default listingsReducer;
