export const showError = (message) => (dispatch) => {
    console.log('showError',message)
    setTimeout(() => {
        alert(message)
    },1000)
    // dispatch({ type: 'errors/SHOW_ERROR', payload: message });
};

export const dismissError = (message) => (dispatch) => {
    dispatch({ type: 'errors/DISMISS_ERROR' });
};
