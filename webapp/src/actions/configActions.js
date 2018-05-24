import * as types from './_types';

export function updateConfig(updated) {
    return {
        type: types.CONFIG_UPDATE,
        data: updated,
    };
}

export function updateState(new_state) {
    return {
        type:types.UPDATE_MAILCAT_STATE,
        state: new_state
    }
}

export function addCategory(category) {
    return {
        type: types.ADD_CATEGORY,
        category: category
    }
}

export function removeCategory(category) {
    return {
        type: types.REMOVE_CATEGORY,
        category: category
    }
}