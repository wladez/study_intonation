import * as actions from '../actions/foldersActions';
import * as apis from './api_list';

const PORT = 8080;
const API_BASE_URL = `http://localhost:${PORT}`;

export function getFolders(config) {
    actions.getFolders(apis.API_POST_FOLDERS, 'POST', {
        "Accept": "application/json"
    }, config);
}

export function call(endpoint, init = {}, noJson=false) {
    init.mode = 'cors';
    init.method = init.method || 'GET';
    init.credentials = 'same-origin';
    init.headers = init.headers || {};
    return fetch(`${API_BASE_URL}${endpoint}`, init).then(data => noJson ? data : data.json());
}