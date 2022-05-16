const setBottomModalType = (data) => {
    return {
        type: 'SET_BOTTOM_MODAL_TYPE',
        payload: data,
    };
};

export const hideBottomModal = () => {
    return {
        type: 'HIDE_BOTTOM_MODAL',
    };
};

const hideTabBar = () => {
    return {
        type: 'HIDE_BOTTOM_TAB_BAR',
    };
};

const showTabBar = () => {
    return {
        type: 'SHOW_BOTTOM_TAB_BAR',
    };
};

const toggleTabBar = () => {
    return {
        type: 'TOGGLE_BOTTOM_TAB_BAR',
    };
};

export default {
    setBottomModalType,
    hideBottomModal,
    showTabBar,
    hideTabBar,
    toggleTabBar,
};
