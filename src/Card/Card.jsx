import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

const defaultDepth = 1;

/*
  Props:
  - horizontal <boolean>: horizontal card
  - vertical <boolean>: vertical card
*/
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
    passedProps = {
      ...passedProps,
      className: this.className()
    }
    return (
      <div {...passedProps}>
        {this.props.children}
      </div>
    );
  }
}

Card = Guac(Card);

export default Card;
export {Card};
