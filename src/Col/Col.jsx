import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  NOTE: 0 size will make the component invisible.
  -xs <int>: flex-size
  -sm <int>: flex-size
  -md <int>: flex-size
  -lg <int>: flex-size
*/
class Col extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'yui-md-grid-col';
    className += typeof(this.props.xs) === 'number' ? ' col-xs-' + this.props.xs : '';
    className += typeof(this.props.sm) === 'number' ? ' col-sm-' + this.props.sm : '';
    className += typeof(this.props.md) === 'number' ? ' col-md-' + this.props.md : '';
    className += typeof(this.props.lg) === 'number' ? ' col-lg-' + this.props.lg : '';
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

Col = Guac(Col);

export default Col;
export {Col};
