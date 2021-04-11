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
      width: '250px',
      height: '250px',
      border: 'solid',
    },
  };

  return (
    open
    && (
      <>
        <Box
          style={styles.container}
        >
          <p> Modal</p>
          {children}
        </Box>
        {activeRef && <p> Active Ref</p>}
      </>
    )
  );
});

export default Modal;
