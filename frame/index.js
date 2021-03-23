// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import reducers from '@core/reducers';
import rootDomTag from '@pkgs/root-dom-tag';

import App from './App';

// Create middleware required for all builds
const middleware = [
  thunk,
  thunk.withExtraArgument(''),
];

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
  || compose
);

const store = createStore(
  reducers(),
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

const Main = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const domNode = document.getElementById(rootDomTag);
if (domNode) {
  ReactDOM.render(
    <Main />,
    domNode,
  );
} else {
  console.error(`Element id ${rootDomTag} could not be found`);
}
