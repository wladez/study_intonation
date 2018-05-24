import { combineReducers } from 'redux';
import configReducer from './configReducer';
import foldersReducer from './foldersReducer';
import messagesReducer  from './messagesReducer'
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    config: configReducer,
    folders: foldersReducer,
    messages: messagesReducer,

});

export default rootReducer;
