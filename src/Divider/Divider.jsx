import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - vertical <boolean>: whether or not this is vertical.
  - horizontal <boolean>: whether or not this is horizontal.
  - inset <boolean>: inset or not.
  - margin <boolean>: whether or not to include margin.
*/
class Divider extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'divider';
    className += this.props.vertical ? ' vertical' : '';
    className += this.props.horizontal ? ' horizontal' : '';
    className += !this.props.margin ? ' no-margin' : '';
    className += this.props.inset ? ' inset' : '';
    return className;
  }

  render() {
    return (
      <div className={this.className()}/>
    );
  }
}
Divider.defaultProps = {
  margin: false,
  inset: false
};

Divider = Guac(Divider);

export default Divider;
export {Divider};
