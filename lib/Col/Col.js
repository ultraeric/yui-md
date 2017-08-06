var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  NOTE: 0 size will make the component invisible.
  - s <int>: flex size for small components.
  - m <int>: flex size for medium components.
  - l <int>: flex size for large components.
*/
class Col extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'yui-md-grid-col';
    className += typeof this.props.sm === 'number' ? ' col-sm-' + this.props.sm : '';
    className += typeof this.props.md === 'number' ? ' col-md-' + this.props.md : '';
    className += typeof this.props.lg === 'number' ? ' col-lg-' + this.props.lg : '';
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

Col = Guac(Col);

export default Col;
export { Col };