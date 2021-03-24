// @flow
import * as React from 'react';
import type { Firebase } from 'firebase/app';

import firebaseContext from '../firebaseContext';

/**
 * Easily access Firebase functionality within a React component
 */
export default function useFormValues(): Firebase {
  const context = React.useContext(firebaseContext);

  return context;
}
