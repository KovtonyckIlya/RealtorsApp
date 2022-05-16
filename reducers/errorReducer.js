const initialState = {
    show: false,
    message: 'This is an error',
};

const errorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'errors/SHOW_ERROR':
            return { ...state, show: true, message: payload };
        case 'errors/DISMISS_ERROR':
            return { ...state, show: false };
        default:
            return state;
    }
};

export default errorReducer;
