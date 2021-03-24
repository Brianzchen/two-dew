// @flow
import type { Action } from 'redux';

import * as constants from './constants';

export const setAuthenticated = (authenticated: boolean): Action<string> => ({
  type: constants.SET_AUTHENTICATED,
  payload: {
    authenticated,
  },
});
