var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Note: place this inside your Content div.

  Props:
  - raised <boolean>: raised or not
  - backgroundColor <string>: background color
*/
class StickyFooter extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'sticky-footer';
    className += this.props.raised ? ' z-depth-2' : '';
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
    let passedProps = this.deleteUsedProps(['raised']);
    passedProps = _extends({}, passedProps, {
      className: this.className(),
      style: this.style()
    });
    return React.createElement(
      'div',
      passedProps,
      this.props.children
    );
  }
}

StickyFooter = Guac(StickyFooter);

export default StickyFooter;
export { StickyFooter };