import * as React from 'react';
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
    passedProps = {
      ...passedProps,
      className: this.className()
    };

    return (
        <Button {...passedProps}>
          {this.props.children}
        </Button>
    );
  }
}

MenuItem = Guac(MenuItem);

export default MenuItem;
export {MenuItem};
