var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - size <string>: size
*/
class Icon extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    return 'material-icons';
  }

  style() {
    let style = {};
    if (this.props.size) {
      style.fontSize = this.props.size;
    }
    return style;
  }

  render() {
    let passedProps = this.deleteUsedProps('children', 'size');
    passedProps = _extends({}, passedProps, {
      className: this.className(),
      style: this.style()
    });

    return React.createElement(
      'i',
      passedProps,
      this.props.children
    );
  }
}

Icon = Guac(Icon);
export default Icon;
export { Icon };