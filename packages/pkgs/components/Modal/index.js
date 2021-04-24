// @flow
import * as React from 'react';

import Box from '../Box';

export type Props = {
    children?: React.Node,
    open?: boolean,
};

const Modal: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  open = true,
}: Props, ref) => {
  const containerRef = React.useRef();
  const activeRef = ref || containerRef;

  const styles = {
    container: {
      width: '50%',
      height: 'auto',
      padding: '40px',
      border: 'solid',
      borderRadius: '30px',
      display: 'flex-wrap',
    },
  };

  return open && (
    <>
      <Box
        style={styles.container}
      >
        <div>
          {' '}
          Modal
          {children}
        </div>
      </Box>
      {activeRef && <p> Active Ref</p>}
    </>
  );
});

export default Modal;
