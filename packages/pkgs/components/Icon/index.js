// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';

type Props = {
  ...BoxT,
  icon?: string,
  size?: number | string,
  ...
};

/**
 * Create icons easily with the icon prop
 */
const Icon: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  icon = '',
  size = 'inherit',
  style = {},
  className = '',
  ...otherProps
}: Props, ref) => {
  const styles = {
    icon: {
      fontSize: size,
      ...style,
    },
  };

  return (
    <Box
      {...otherProps}
      as="i"
      style={styles.icon}
      className={`mdi mdi-${icon} ${className}`}
      ref={ref}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;
