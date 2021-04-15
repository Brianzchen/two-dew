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
      border: 'solid',
      borderRadius: '30px',
      display: 'flex-wrap',
    },
  };

  return open && (
    <>
      <button type="button"> Exit</button>
      <Box
        style={styles.container}
      >
        <div> Modal</div>
        {children}
      </Box>
      {activeRef && <p> Active Ref</p>}
    </>
  );
});

export default Modal;
