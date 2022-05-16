import { clearListings } from './exploreListingsActions';
import { clearPins } from './exploreMapActions';

export const setTitle = (title) => (dispatch) => {
    dispatch({ type: 'explore/SET_TITLE', payload: title });
};

export const clear = () => (dispatch) => {
    dispatch(clearListings());
    dispatch(clearPins());
};
