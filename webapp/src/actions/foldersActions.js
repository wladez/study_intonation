import * as types from './_types';

function foldersRequest() {
    return {
        type: types.FOLDERS_REQUEST,
        fetching: true,
        error: null,
    };
}

function foldersSuccess(json) {
    return {
        type: types.FOLDERS_SUCCESS,
        fetching: false,
        error: null,
        data: json,
    }
}

function foldersFailure(json) {
    return {
        type: types.FOLDERS_FAILURE,
        fetching: false,
        error: json
    };
}

export function getFolders(query='', method='GET', headers, body='') {

    const url = `http://localhost:8080/${query}`;

    return (dispatch) => {
        dispatch(foldersRequest());
        fetch(url, {
            headers: headers,
            method: method,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then (items => dispatch(foldersSuccess(items)))
            .catch (error => dispatch(foldersFailure(error)));
    };

}

