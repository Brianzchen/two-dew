// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import rootDomTag from '@pkgs/root-dom-tag';
import { firebaseContext } from '@pkgs/utils';

import reducers from '@core/store';

import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDu-S6Ow_c6U2wMLcIKtKz-qA30LoxBLso',
  authDomain: 'two-dew.firebaseapp.com',
  projectId: 'two-dew',
  storageBucket: 'two-dew.appspot.com',
  messagingSenderId: '419756489559',
  appId: '1:419756489559:web:07cef82353c2f1c1e5dc12',
  measurementId: 'G-7QGVGKQQ16',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
      <firebaseContext.Provider value={firebase}>
        <App />
      </firebaseContext.Provider>
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
