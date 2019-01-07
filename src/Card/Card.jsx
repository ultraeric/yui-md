import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import Row from '../Row';
import Col from '../Col';

const defaultDepth = 1;

/*
  Props:
  - horizontal <boolean>: horizontal card
  - vertical <boolean>: vertical card
  - imageArea <Component>: singular image component to render.
  - textArea <Component>: singular text component to render.
  - depth <int>: depth of component.
  - rounded <boolean>: whether or not corners are rounded.
  - picSize <int>: int/12 for ratio of card picture should take up.
*/
class Card extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    var className = 'card';
    className += ' z-depth-' + this.props.depth;
    className += this.props.rounded ? ' rounded' : '';
    className += this.props.vertical ? ' vertical' : ' horizontal';
    return className;
  }

  getImageAreaComponent() {
    let imageArea = this.props.imageArea;
    if (imageArea) {
      return React.cloneElement(imageArea, {className: 'card-image-area' +
                                                        (imageArea.props.className || '')});
    } else {
      return null;
    }
  }

  getTextAreaComponent() {
    let textArea = this.props.textArea;
    if (textArea) {
      return React.cloneElement(textArea, {className: 'card-text-area' +
                                                        (textArea.props.className || '')});
    } else {
      return null;
    }
  }

  render() {
    let passedProps = this.deleteUsedProps(['children']);
    passedProps = {
      ...passedProps,
      className: this.className()
    };
    return (
      <div {...passedProps}>
        <Row className={'card-content'}>
          {this.props.children}
          {this.getImageAreaComponent()}
          {this.getTextAreaComponent()}
        </Row>
      </div>
    );
  }
}

Card = Guac(Card);
Card.defaultProps = {
  depth: defaultDepth,
  rounded: true,
  vertical: true,
  horizontal: false
};

export default Card;
export {Card};
