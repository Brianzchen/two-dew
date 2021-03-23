// @flow
export const getStuff = (): () => Promise<string> => (
  () => new Promise((resolve) => {
    resolve('just a test');
  })
);
