// @flow
import { combineReducers } from 'redux';

import app from './app';

export default (): any => combineReducers({
  app: app.reducer,
});

export {
  app,
};

export { default as useSelector } from './useSelector';

export * from './types';
