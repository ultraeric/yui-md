var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';
import Button from '../Button';

/*
  Props:
  - subItem <boolean>: whether or not the MenuItem is a sub-item.

  Internal Props:
  - dense <boolean>: passed from Menu. Determines if layout is dense or not.
*/
class MenuItem extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'menu-item important';
    className += this.props.subItem ? ' sub-item' : '';
    className += this.props.dense ? ' dense' : '';
    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['dense']);
    passedProps = _extends({}, passedProps, {
      className: this.className()
    });

    return React.createElement(
      Button,
      passedProps,
      this.props.children
    );
  }
}

MenuItem = Guac(MenuItem);

export default MenuItem;
export { MenuItem };