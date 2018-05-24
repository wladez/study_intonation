import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import history from './utils/history';

import Routes from './Routes'; // eslint-disable-line;

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component history={ history } />
    </AppContainer>,
    document.getElementById('root')
  );
};
render(Routes);


// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./', () => { render(Routes); });
}
