import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import menu from './menu';

export default (history) => combineReducers({
  router: connectRouter(history),
  menu,
});
