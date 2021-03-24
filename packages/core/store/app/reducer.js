// @flow

import type { AppT, ActionT } from '../types';

import initialState from './initialState';
import * as constants from './constants';

export default (state: AppT = initialState, action: ActionT): AppT => {
  switch (action.type) {
    case constants.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload.authenticated,
      };
    default:
      return state;
  }
};
