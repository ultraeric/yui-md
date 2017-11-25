import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as utils from 'guac-hoc/lib/utils';
import '../styles/style.scss';

import applyRipple from '../utils/applyRipple';
import Guac from 'guac-hoc/lib/Guac';

let overlayOptions = {
  rippleFilter: (event) =>true
}
/*
  Props:
  - ripple <boolean>: whether or not to ripple on overlay click.
*/
class Overlay extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  className() {
    let className = 'overlay';
    className += !this.props.active ? ' inactive' : '';
    return className;
  }

  style() {
    let style = {};
    if(this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    return style;
  }

  render() {
    let passedProps = this.deleteUsedProps(['children', 'active', 'rippleComponents']);

    //TODO: Fix the active prop in Guac-HOC package
    passedProps = {
      ...passedProps,
      className: this.className(),
      onClick: this.onClick,
      style: this.style()
    }

    return (
      <div className={'overlay-container'} style={this.style()}>
        <div className={'overlay-children'}>
          {this.props.children}
        </div>
        <div {...passedProps}>
          {this.props.rippleComponents}
        </div>
      </div>
    );
  }
}

Overlay = applyRipple(Guac(Overlay), overlayOptions);

export default Overlay;
export {Overlay};
