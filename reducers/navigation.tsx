const initialState = {
    bottomModalShown: false,
    bottomModalType: null,
    bottomTabBarVisible: false,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOTTOM_MODAL_TYPE':
            let bottomModalType = action.payload;
            if (bottomModalType == state.bottomModalType) {
                bottomModalType = null;
            }
            return {
                ...state,
                bottomModalType,
                bottomModalShown: true,
            };
        case 'HIDE_BOTTOM_MODAL':
            return {
                ...state,
                bottomModalType: null,
                bottomModalShown: false,
            };
        case 'HIDE_BOTTOM_TAB_BAR':
            return { ...state, bottomTabBarVisible: false };
        case 'SHOW_BOTTOM_TAB_BAR':
            return { ...state, bottomTabBarVisible: true };
        case 'TOGGLE_BOTTOM_TAB_BAR':
            return {
                ...state,
                bottomTabBarVisible: !state.bottomTabBarVisible,
            };
        default:
            return state;
    }
};
export default navigationReducer;
