// @flow
import { useSelector as useReactReduxSelector } from 'react-redux';

import type { StateT } from './types';

function useSelector<SS>(
  selector: (state: StateT) => SS,
  equalityFn?: (a: SS, b: SS) => boolean,
): SS {
  return useReactReduxSelector(selector, equalityFn);
}

export default useSelector;
