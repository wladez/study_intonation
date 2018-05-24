import * as types from "./_types";

function messagesRequest() {
    return {
        type: types.MESSAGES_REQUEST,
        fetching: true,
        error: null
    }
}

function messagesSuccess(json) {
    return {
        type: types.MESSAGES_SUCCESS,
        fetching: false,
        error: null,
        data: json
    }
}

function messageFailure(json) {
    return {
        type: types.MESSAGES_FAILURE,
        fetching: false,
        error: json,
    }
}

export function getMessages(query='', method='GET', headers) {
    const url = `http://localhost:8080/${query}`;

    return (dispatch) => {
        dispatch(messagesRequest());
        fetch(url, {
            headers: headers,
            method: method
        })
            .then (response => response.json())
            .then (items => dispatch(messagesSuccess(items)))
            .catch (error => dispatch(messageFailure(error)));
    }
}