const initialState = {
    latestHourToday: 12,
    latestHour: 17, // 5 p,
    latestHourInstantAccess: 19, // 7 pm
    maxDateWindow: 7,
    selectedDate: null,
    minStartTime: null,
    minEndTime: null,
    startTime: null,
    endTime: null,
    comments: '',
};

const scheduleReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'schedule/SET_SELECTED_DATE':
            return { ...state, selectedDate: payload };
        case 'schedule/SET_MIN_START_TIME':
            return { ...state, minStartTime: payload };
        case 'schedule/SET_MIN_END_TIME':
            return { ...state, minEndTime: payload };
        case 'schedule/SET_START_TIME':
            return { ...state, startTime: payload };
        case 'schedule/SET_END_TIME':
            return { ...state, endTime: payload };
        case 'schedule/SET_COMMENTS':
            return { ...state, comments: payload };
        default:
            return state;
    }
};

export default scheduleReducer;
