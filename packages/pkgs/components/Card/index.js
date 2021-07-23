// @flow
import * as React from 'react';
import { css } from 'aphrodite';

import Box from '../Box';
import type { BoxT } from '../Box';

type Props = {
  children?: React.Node,
  ...BoxT,
  ...
};

const Card: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  className = '',
  ...otherProps
}: Props, ref) => {
  const styles = {
    container: {
      borderRadius: '8px',
      ...style,
    },
  };

  return (
    <Box
      {...otherProps}
      style={styles.container}
      className={`${css(styles.container)} ${className}`}
      ref={ref}
    >
      {children}
    </Box>
  );
});

Card.displayName = 'Card';

export default Card;
