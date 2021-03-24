// @flow
import * as React from 'react';
import type { Firebase } from 'firebase/app';

const Context: React.Context<Firebase> = React.createContext<Firebase>({
  INTERNAL: {},
  SDK_VERSION: '',
  User: () => {},
  analytics: () => {},
  app: () => {},
  apps: () => {},
  auth: () => {},
  firestore: () => {},
  initializeApp: () => {},
  installations: () => {},
  onLog: () => {},
  registerVersion: () => {},
  setLogLevel: () => {},
});

export const {
  Consumer,
  Provider,
} = Context;

export default Context;
