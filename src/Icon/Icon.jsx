import * as React from 'react';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - size <string>: size
*/
class Icon extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    return 'material-icons';
  }

  style() {
    let style = {};
    if (this.props.size) {
      style.fontSize = this.props.size;
    }
    return style;
  }

  render() {
    let passedProps = this.deleteUsedProps('children', 'size');
    passedProps = {
      ...passedProps,
      className: this.className(),
      style: this.style()
    }

    return (
      <i {...passedProps}>
        {this.props.children}
      </i>
    );
  }
}

Icon = Guac(Icon);
export default Icon;
export {Icon};
