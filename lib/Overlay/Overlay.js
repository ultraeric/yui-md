var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as utils from 'guac-hoc/lib/utils';
import '../styles/style.scss';

import applyRipple from '../utils/applyRipple';
import Guac from 'guac-hoc/lib/Guac';

let overlayOptions = {
  rippleFilter: event => true
  /*
    Props:
    - ripple <boolean>: whether or not to ripple on overlay click.
  */
};class Overlay extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'overlay';
    className += !this.props.active ? ' inactive' : '';
    return className;
  }

  style() {
    let style = {};
    if (this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    return style;
  }

  render() {
    let passedProps = this.deleteUsedProps(['children', 'active', 'rippleComponents']);

    //TODO: Fix the active prop in Guac-HOC package
    passedProps = _extends({}, passedProps, {
      className: this.className(),
      onClick: this.onClick,
      style: this.style()
    });

    return React.createElement(
      'div',
      { className: 'overlay-container', style: this.style() },
      React.createElement(
        'div',
        { className: 'overlay-children' },
        this.props.children
      ),
      React.createElement(
        'div',
        passedProps,
        this.props.rippleComponents
      )
    );
  }
}

Overlay = applyRipple(Guac(Overlay), overlayOptions);

export default Overlay;
export { Overlay };