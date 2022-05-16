import moment from 'moment';

export const canBookToday = (listing) => (dispatch, getState) => {
    const lockbox = listing.lockboxes ? listing.lockboxes[0] : null;
    console.log('hours', lockbox ? 20 : 12);
    const result = moment().isBefore(
        moment()
            .startOf('day')
            .add(lockbox ? 20 : 12, 'hours')
    );

    return result;
};

//everything else 8 am
export const getLatestBookingTime = (listing) => (dispatch, getState) => {
    const { selectedDate } = getState().schedule;
    const lockbox = listing.lockboxes ? listing.lockboxes[0] : null;

    if (
        !selectedDate ||
        !selectedDate.startOf('day').isSame(moment().startOf('day'))
    ) {
        // not today
        return 20;
    }
    if (lockbox) {
        console.log('latest booking time 8 pm');
        return 20; // 8 pm
    } else {
        console.log('latest booking time 12 pm');
        return 12; // noon
    }
};

export const getValidDates = (listing) => (dispatch, getState) => {
    const now = moment();

    const { maxDateWindow, latestHourToday } = getState().schedule;
    const result = [...new Array(maxDateWindow)].map((_, i) => {
        return moment()
            .startOf('day')
            .add(i + 1, 'd');
    });

    console.log('go to canbook todya???');
    if (canBookToday(listing)(dispatch, getState)) {
        result.unshift(moment());
    }

    return result;
};

export const setSelectedDate = (date) => (dispatch) => {
    dispatch({
        type: 'schedule/SET_SELECTED_DATE',
        payload: date,
    });
};

export const getMinStartTime = (listing) => (dispatch, getState) => {
    console.log('getMinStartTime');
    const { selectedDate } = getState().schedule;
    const lockbox = listing.lockboxes ? listing.lockboxes[0] : null;
    const instantAccess = lockbox ? lockbox.instantAccess : false;

    if (
        !selectedDate ||
        !selectedDate.startOf('day').isSame(moment().startOf('day'))
    ) {
        // is not today
        console.log('not today', selectedDate);
        return 8;
    }

    if (instantAccess) {
        console.log('getMinStartTime', moment().get('hour'));
        return moment().get('hour');
    } else if (lockbox) {
        return moment().get('hour') + 1;
    } else {
        return 12;
    }
};

export const setMinEndTime = (time) => (dispatch) => {
    dispatch({
        type: 'schedule/SET_MIN_END_TIME',
        payload: time,
    });
};

export const setStartTime = (time) => (dispatch) => {
    dispatch({
        type: 'schedule/SET_START_TIME',
        payload: time,
    });
};

export const setEndTime = (time) => (dispatch) => {
    dispatch({
        type: 'schedule/SET_END_TIME',
        payload: time,
    });
};

export const setComments = (text) => (dispatch) => {
    dispatch({
        type: 'schedule/SET_COMMENTS',
        payload: text,
    });
};
