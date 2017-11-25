import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  -xs <int>: flex-size
  -sm <int>: flex-size
  -md <int>: flex-size
  -lg <int>: flex-size
  -reverse <string>: what size to reverse at, separated by spaces
*/
class Row extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'yui-md-grid-row';
    className += typeof(this.props.xs) === 'number' ? ' row-xs-' + this.props.xs : '';
    className += typeof(this.props.sm) === 'number' ? ' row-sm-' + this.props.sm : '';
    className += typeof(this.props.md) === 'number' ? ' row-md-' + this.props.md : '';
    className += typeof(this.props.lg) === 'number' ? ' row-lg-' + this.props.lg : '';
    if (this.props.xs === 0 || this.props.sm === 0 ||
        this.props.md === 0 || this.props.lg === 0) {
          className += ' hidden-grid-element';
        }
    let reverses = this.props.reverse ? this.props.reverse.split(' ') : [];
    for (var reverse of reverses) {
      className += reverse ? ' reverse-' + reverse : '';
    }
    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['xs', 'sm', 'md', 'lg']);
    passedProps = {
      ...passedProps,
      className: this.className()
    };
    return (
      <div {...passedProps}>
        {this.props.children}
      </div>
    );
  }
}

Row = Guac(Row);

export default Row;
export {Row};
