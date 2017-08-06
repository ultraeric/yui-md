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
    className += typeof(this.props.sm) === 'number' ? ' row-sm-' + this.props.sm : '';
    className += typeof(this.props.md) === 'number' ? ' row-md-' + this.props.md : '';
    className += typeof(this.props.lg) === 'number' ? ' row-lg-' + this.props.lg : '';
    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['sm', 'md', 'lg']);
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
