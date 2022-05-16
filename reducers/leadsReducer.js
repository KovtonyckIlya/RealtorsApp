const initialState = {
    leads: {},
    userlead: {},
    sorter: {},
    total: 0,
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'leads/IS_LOADING':
            return { ...state, loading: true };
        case 'leads/FETCH_USERLEADS_SUCCESS':
            return {
                ...state,
                leads: payload.items,
                total: payload.total,
                loading: false,
            };
        case 'leads/FETCH_USERLEAD_SUCCESS':
            return { ...state, userlead: payload };
        case 'leads/APPROVE_USERLEAD_SUCCESS':
            state.leads[payload.id] = payload;
            return { ...state, leads: { ...state.leads } };
        case 'leads/UPDATE_SORTER':
            return { ...state, sorter: payload };
        case 'leads/DECLINE_USERLEAD_SUCCESS':
            state.leads[payload.id] = payload;
            return { ...state, leads: { ...state.leads } };
        case 'leads/UPDATE_USERLEAD_SUBSTATUS_SUCCESS':
            state.leads[payload.id] = payload;
            return { ...state, leads: { ...state.leads } };
        default:
            return state;
    }
};
