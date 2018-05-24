import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialStore from '../reducers/initialState';
import reducers from '../reducers';

export const store = createStore(
  reducers,
  initialStore,
  applyMiddleware(thunk)
);

