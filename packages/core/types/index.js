// @flow
export type ListItemT = {
  id: string,
  name: string,
  description: string,
  completed: boolean,
  day: number,
  // priority: boolean,
};

export type ListT = {
  id: string,
  name: string,
  owner: string,
  sharedWith: Array<string>,
  type: 'list' | 'daily',
};
