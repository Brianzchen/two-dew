// @flow
import * as React from 'react';
import type { Firebase } from 'firebase/app';

const Context: React.Context<Firebase> = React.createContext<any>();

export const {
  Consumer,
  Provider,
} = Context;

export default Context;
