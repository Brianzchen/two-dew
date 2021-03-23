import initialState from './initialState';
import * as constants from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.OPEN_MENU:
      return {
        ...state,
        open: true,
      };
    case constants.CLOSE_MENU:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
