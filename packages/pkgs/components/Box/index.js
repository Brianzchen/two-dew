// @flow
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

export type BoxT = {
  children?: React.Node,
  as?: any,
  className?: string,
  style?: { [key: string]: any },
  ...
};

const Box: React$AbstractComponent<BoxT, HTMLElement> = React.forwardRef<BoxT, HTMLElement>(({
  children = null,
  as: Element = 'div',
  className = '',
  style = {},
  ...otherProps
}: BoxT, ref) => {
  const styles = StyleSheet.create({
    container: {
      boxSizing: 'border-box',
      ...style,
    },
  });

  return (
    <Element
      {...otherProps}
      ref={ref}
      className={`${css(styles.container)} ${className}`}
    >
      {children}
    </Element>
  );
});

Box.displayName = 'Box';

export default Box;
