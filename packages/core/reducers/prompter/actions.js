import {
  getStuff,
} from '@core/service/testing';

export const doStuff = () => (
  (dispatch) => {
    dispatch(getStuff()).then((res) => {
      alert('The answer is in the console');
      console.info(`the server responsed with ${res}`);
    });
  }
);
