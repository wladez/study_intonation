import initialState from './initialState';
import * as types from '../actions/_types';

const messagesReducer = (state = initialState.messages, action) => {
    switch (action.type) {
        case types.MESSAGES_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case types.MESSAGES_SUCCESS: {
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.data,
            };
        }
        case types.MESSAGES_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default messagesReducer;