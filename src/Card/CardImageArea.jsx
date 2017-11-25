import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import Col from '../Col';

/*
  Props:
  - Inherits from Col props
*/
class CardImageArea extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    return 'card-image-area';
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

CardImageArea = Guac(CardImageArea);

export default CardImageArea;
export {CardImageArea};
