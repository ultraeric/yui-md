var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../styles/style.scss';
import { getAnimationTimeBySize } from '../timingUtils';
import Hoc from 'guac-hoc/lib/Hoc';

let globalDefaults = {
  rippleFilter: () => true,
  centerRipple: false

  /*
    Note that for ripple to work properly, nothing between the WrappedComponent.props.children
    and WrappedComponent can have overflow: hidden.
  
    Parameters:
    - defaultOptions <object>:
      - rippleFilter <function>: function called with onMouseDown with all arguments
        that onMouseDown receives. Should return a boolean.
      - centerRipple <boolean>: whether or not to center the ripple on the component.
  */

};function applyRipple(WrappedComponent, defaultOptions = {}) {
  let defaults = _extends({}, globalDefaults, defaultOptions);
  //An overlay component for the Ripple
  /*
    Props:
    - ripple <boolean>: whether or not to ripple on click.
    - light <boolean>: whether the ripple should be light or dark.
  */
  class WrappedRipple extends React.Component {
    constructor() {
      super();
      this.bindAllMethods();

      //Track the current ripple number.
      this.index = 0;
      //Track the current number of ripples that need to be removed.
      this.numToRemove = 0;
      this.state = {
        rippleComponents: []
      };
    }

    className() {
      return 'ripple-container';
    }

    // Ripple if the `ripple` prop is not provided, or if it is true, and if
    // `defaults.rippleFilter` returns true or is not provided
    onMouseDown(event) {
      if ((typeof this.props.ripple === 'undefined' || this.props.ripple) && (defaults.rippleFilter && defaults.rippleFilter(...arguments) || !defaults.rippleFilter)) {
        event.persist();
        setTimeout(() => this.startRipple(event), 0);
      }
    }

    onMouseUp(event) {
      setTimeout(() => this.stopRipple(event), 0);
    }

    onMouseLeave(event) {
      setTimeout(() => this.stopRipple(event), 0);
    }

    //Called on click
    startRipple(event) {
      //Gets the rippleContainer DOM node for calculations
      let rippleSize = this.calcRippleSize(event);
      let rippleCoords = this.calcRippleCoords(event, rippleSize);

      rippleCoords ? this.renderRipple(rippleCoords, rippleSize) : null;
    }

    stopRipple(event) {
      let rippleComponents = [...this.state.rippleComponents];
      if (rippleComponents.length === 0) {
        return;
      }
      let rippleComponent = rippleComponents.pop();
      rippleComponent = React.cloneElement(rippleComponent, { className: this.rippleClassName() + ' ripple-fade' });
      rippleComponents.push(rippleComponent);
      this.setState({ rippleComponents: rippleComponents });
    }

    //Gets DOM Node of container and returns max of its width and height
    calcRippleSize(event) {
      this.rippleBounds = ReactDOM.findDOMNode(this.rippleContainerNode).getBoundingClientRect();
      if (defaults.centerRipple) {
        return Math.max((this.rippleBounds.right - this.rippleBounds.left) / 2, (this.rippleBounds.bottom - this.rippleBounds.top) / 2);
      } else {
        return Math.max(Math.abs(event.clientX - this.rippleBounds.left), Math.abs(event.clientX - this.rippleBounds.right), Math.abs(event.clientY - this.rippleBounds.top), Math.abs(event.clientY - this.rippleBounds.bottom));
      }
    }
    //Gets originating coordinates of the click relative to component
    calcRippleCoords(event, rippleSize) {
      if (event.clientX < this.rippleBounds.left || event.clientX > this.rippleBounds.right || event.clientY > this.rippleBounds.bottom || event.clientY < this.rippleBounds.top) {
        return null;
      }

      if (defaults.centerRipple) {
        return { x: rippleSize / 2, y: rippleSize / 2 };
      }

      //Top left corner of bounding box for ripple animation relative to top left of parent
      let x = event.clientX - this.rippleBounds.left - rippleSize / 2;
      let y = event.clientY - this.rippleBounds.top - rippleSize / 2;

      return { x, y };
    }

    rippleClassName() {
      let className = 'ripple-effect';
      className += this.props.light ? ' light' : '';
      return className;
    }

    //Renders the ripple animation
    renderRipple(rippleCoords, rippleSize) {
      let rippleComponents = this.state.rippleComponents;
      let rippleDuration = 3 * getAnimationTimeBySize(rippleSize);
      rippleComponents.push(React.createElement('span', { style: { left: rippleCoords.x,
          top: rippleCoords.y,
          width: rippleSize,
          height: rippleSize,
          animationDuration: rippleDuration + 's' },
        className: this.rippleClassName(),
        key: this.index }));
      rippleComponents = rippleComponents.slice(this.numToRemove, rippleComponents.length);
      this.numToRemove = 0;
      this.setState({ rippleComponents: rippleComponents });
      this.index += 1;
      setTimeout(() => this.numToRemove += 1, rippleDuration * 1000);
    }

    render() {
      //Copy over user props
      let passedProps = this.deleteUsedProps(['children', 'ripple', 'centerRipple']);
      passedProps = _extends({}, passedProps, {
        ref: node => this.rippleContainerNode = node,
        className: this.className(),
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseLeave: this.onMouseLeave
      });

      //Container for ripple
      return React.createElement(
        WrappedComponent,
        _extends({}, passedProps, { rippleComponents: React.createElement(
            'div',
            { className: 'ripple-parent' },
            this.state.rippleComponents
          ) }),
        this.props.children
      );
    }
  }
  return Hoc(WrappedRipple);
}

export default applyRipple;
export { applyRipple };