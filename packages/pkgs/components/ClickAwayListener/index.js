// @flow
import React from 'react';
import type { Node as ReactNode } from 'react';
import ReactDOM from 'react-dom';

const on = (element, type, callback) => {
  if (element.addEventListener) {
    element.addEventListener(type, callback);
  }
};

const off = (element, type, callback) => {
  if (element.removeEventListener) {
    element.removeEventListener(type, callback);
  }
};

const isDescendant = (element, target) => {
  if (target !== null && target instanceof Node) {
    return element === target || isDescendant(element, target.parentNode);
  }
  return false;
};

const clickAwayEvents = ['mouseup', 'touchend'];
const bind = (callback) => clickAwayEvents.forEach((event) => on(document, event, callback));
const unbind = (callback) => clickAwayEvents.forEach((event) => off(document, event, callback));

type Props = {|
  children: ReactNode,
  onClickAway?: (...args: Array<any>) => any,
  exclusions?: Array<{ ... } | null>,
|};

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself. For instance, if you need to hide a menu when people click anywhere else on your page.
 */
class ClickAwayListener extends React.Component<Props> {
  isCurrentlyMounted: boolean;

  constructor(props: Props) {
    super(props);

    (this: any).handleClickAway = this.handleClickAway.bind(this);
  }

  componentDidMount() {
    this.isCurrentlyMounted = true;
    if (this.props.onClickAway) {
      bind(this.handleClickAway);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.onClickAway !== this.props.onClickAway) {
      unbind(this.handleClickAway);
      if (this.props.onClickAway) {
        bind(this.handleClickAway);
      }
    }
  }

  componentWillUnmount() {
    this.isCurrentlyMounted = false;
    unbind(this.handleClickAway);
  }

  handleClickAway(event: MouseEvent | TouchEvent) {
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (this.isCurrentlyMounted) {
      // eslint-disable-next-line react/no-find-dom-node
      const element = ReactDOM.findDOMNode(this);

      if (event.target instanceof Node && document.documentElement?.contains(event.target)
          && !isDescendant(element, event.target)
          && (this.props.exclusions || []).reduce((acc, cur) => {
            if (!acc || isDescendant(cur, event.target)) return false;
            return true;
          }, true)) {
        this.props.onClickAway && this.props.onClickAway(event);
      }
    }
  }

  render(): ReactNode {
    return this.props.children;
  }
}

export default ClickAwayListener;
