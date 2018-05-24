import initialState from './initialState';
import * as types from '../actions/_types';

const foldersReducer = (state = initialState.folders, action) => {
    switch (action.type) {
        case types.FOLDERS_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case types.FOLDERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.data,
            };
        case types.FOLDERS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.data,
            };
        default:
            return state;
    }
};

export default foldersReducer;