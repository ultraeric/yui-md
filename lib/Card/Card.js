var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

const defaultDepth = 1;

class Card extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    return 'card-container';
  }

  render() {
    let passedProps = this.deleteUsedProps([]);
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

Card = Guac(Card);

export default Card;
export { Card };