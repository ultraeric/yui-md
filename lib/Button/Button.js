var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import '../styles/style.scss';
import { Guac } from 'guac-hoc/lib/Guac';
import { applyRipple } from '../utils/applyRipple';
import { Icon } from '../Icon';
import { Menu, MenuWrapper } from '../Menu';

/*
  Generic button, can have text/icon/pictures/etc.

  Option Parameters:
  - circle <boolean>: is circle button or not.
  - iconOnly <boolean>: show only icon or not.
  - large <boolean>: is large icon button or not.
  - hoverShade <boolean>: whether to shade on hover or not.
*/

let defaultOptions = {
  circle: false,
  iconOnly: false,
  large: false,
  depth: 0
};

let iconOptions = _extends({}, defaultOptions, {
  circle: true,
  iconOnly: true,
  large: false,
  centerRipple: true
});

let floatingActionOptions = _extends({}, iconOptions, {
  large: true,
  depth: 2,
  centerRipple: false
});

function createButton(options = defaultOptions) {
  options = _extends({}, defaultOptions, options);
  class Button extends React.Component {
    constructor() {
      super();
      this.bindAllMethods();
    }

    style() {
      let style = {};
      if (this.props.colors) {
        if (this.props.colors.color) {
          style.color = this.props.colors.color;
        }
        if (this.props.colors.backgroundColor) {
          if (this.props.disabled) {
            style.backgroundColor = 'rgba(' + backgroundColor + ', 0.4615)';
          } else {
            style.backgroundColor = backgroundColor;
          }
        }
      }
      return style;
    }

    className() {
      let className = 'button';
      className += this.props.circle ? ' circle' : '';
      className += this.props.iconOnly ? ' icon' : '';
      className += this.props.large ? ' large' : '';
      className += this.props.disabled ? 'disabled' : '';
      return className;
    }

    getIconChild() {
      if (this.props.icon) {
        return React.createElement(
          Icon,
          null,
          this.props.icon
        );
      } else {
        return null;
      }
    }

    getChildren() {
      return this.props.children || null;
    }

    getDivider() {
      if (this.props.icon && this.props.label) {
        return React.createElement('div', { style: { height: '10px' } });
      } else {
        return null;
      }
    }

    getLabelChild() {
      return this.props.label || null;
    }

    render() {
      //Guac-HOC doesn't delete when type is falsey, i.e. 0, '', [], etc.
      let passedProps = this.deleteUsedProps(['rippleComponents', 'intId', 'activeId', 'active', 'circle', 'iconOnly', 'large', 'depth', 'centerRipple']);
      passedProps = _extends({}, passedProps, {
        className: this.className()
      });

      return React.createElement(
        'div',
        passedProps,
        this.props.rippleComponents,
        this.getChildren(),
        this.getIconChild(),
        this.getDivider(),
        this.getLabelChild()
      );
    }
  };
  Button.defaultProps = options;
  return applyRipple(Guac(Button), options);
};

/*
  Shared Props:
  - onClick <function>: called on button click.
  - label <string>: button string label.
  - icon <string>: material icon string label.
  - disabled <boolean>: disabled or not.
  - colors <object>: custom colors.
    - color: text color.
    - backgroundColor: background color
*/
let Button = createButton();
let IconButton = createButton(iconOptions);
let FloatingActionButton = createButton(floatingActionOptions);

export default Button;
export { Button, IconButton, FloatingActionButton };