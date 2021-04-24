// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';

type Props = {
  ...BoxT,
  type?: 'button' | 'submit' | 'reset',
  ...
};

/**
 * Basic button
 */
const Button: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  type = 'button',
  ...otherProps
}: Props, ref) => {
  const styles = {
    button: {
      ...style,
    },
  };

  return (
    <Box
      {...otherProps}
      as="button"
      type={type}
      style={styles.button}
      ref={ref}
    >
      {children}
    </Box>
  );
});

Button.displayName = 'Button';

export default Button;
