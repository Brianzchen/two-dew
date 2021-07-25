// @flow
import * as React from 'react';

import Box from '../Box';

export type Props = {
  children?: React.Node,
  open?: boolean,
  style?: { [key: string]: any },
};

const Modal: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  open = true,
  style = {},
}: Props) => {
  const styles = {
    container: {
      width: '50%',
      height: 'auto',
      padding: '12px',
      border: '1px solid',
      borderRadius: '8px',
      position: 'fixed',
      backgroundColor: 'white',
      zIndex: 10,
      ...style,
    },
  };

  return open && (
    <Box
      style={styles.container}
    >
      <div>
        {children}
      </div>
    </Box>
  );
});

export default Modal;
