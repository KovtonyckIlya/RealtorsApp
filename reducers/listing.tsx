// const initialState = {
//     loading: true,
//     total: 0,
//     listings: [],
//     error: false,
// };
//
// const listingReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'GET_LISTINGS':
//             return {
//                 ...state,
//                 listings: action.payload.listings,
//                 total: action.payload.total ?? state.total,
//                 loading: action.payload.loading ?? false,
//             };
//         default:
//             return state;
//     }
// };
// export default listingReducer;
