import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import Col from '../Col';

/*
  Props:
  - Inherits from Col props
*/
class CardTextArea extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    return 'card-text-area';
  }

  render() {
    let passedProps = this.deleteUsedProps([]);
    passedProps = {
      ...passedProps,
      className: this.className()
    };
    return (
      <Col {...passedProps}>
        {this.props.children}
      </Col>
    );
  }
}

CardTextArea = Guac(CardTextArea);

export default CardTextArea;
export {CardTextArea};
