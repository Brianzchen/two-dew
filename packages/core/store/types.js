// @flow
export type ActionT = {|
  type: string,
  payload: { [key: string]: any },
|};

export type AppT = {|
  authenticated: boolean,
|};

export type StateT = {|
  app: AppT,
|};
