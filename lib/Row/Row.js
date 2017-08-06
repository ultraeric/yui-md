var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  -sm <int>: flex-size
  -md <int>: flex-size
  -lg <int>: flex-size
*/
class Row extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'yui-md-grid-row';
    className += typeof this.props.sm === 'number' ? ' row-sm-' + this.props.sm : '';
    className += typeof this.props.md === 'number' ? ' row-md-' + this.props.md : '';
    className += typeof this.props.lg === 'number' ? ' row-lg-' + this.props.lg : '';
    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['sm', 'md', 'lg']);
    passedProps = _extends({}, passedProps, {
      className: this.className()
    });
    return React.createElement(
      'div',
      passedProps,
      this.props.children
    );
  }
}

Row = Guac(Row);

export default Row;
export { Row };