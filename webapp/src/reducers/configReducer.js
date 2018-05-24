import initialState from './initialState';
import * as types from '../actions/_types'

const configReducer = (state = initialState.config, action) => {
    switch(action.type) {
        case types.CONFIG_UPDATE:
            return {
                ...action.data
            };
        case types.UPDATE_MAILCAT_STATE:
            return {
                ...state,
                stopped: action.state,
            };
        case types.ADD_CATEGORY: {
            const list = state.categories.slice();
            list.push(action.category);
            return {
                ...state,
                categories: list
            };
        }

        case types.REMOVE_CATEGORY: {
            const list = state.categories.slice().filter((val) => val !== action.category);
            return {
                ...state,
                categories: list
            };
        }

        default:
            return state;
    }
};

export default configReducer;