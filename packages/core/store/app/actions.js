// @flow
import type { ActionT } from '../types';

import * as constants from './constants';

export const setAuthenticated = (authenticated: boolean): ActionT => ({
  type: constants.SET_AUTHENTICATED,
  payload: {
    authenticated,
  },
});
