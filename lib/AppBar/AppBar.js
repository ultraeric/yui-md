var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - fixed <boolean>: does not move from its position on the screen.
  - padded <boolean>: provide an extra styled top.
  - prominent <boolean>: large title.

  Style Props:
  - backgroundColor <string>: background color.
  - padBackgroundColor <string>: background color.
  - height <int>: represents the size of the component (for custom headers).
*/
class AppBar extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.appBarRef = this;
    this.state = {
      drawerPadding: 0
    };
  }

  className() {
    let className = 'app-bar';
    className += this.props.fixed ? ' fixed' : '';
    className += this.props.prominent ? ' prominent' : '';
    return className;
  }

  style() {
    let style = { marginLeft: this.state.drawerPadding,
      height: this.getHeight() };
    if (this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    return style;
  }

  padStyle() {
    let style = {};
    if (this.props.padBackgroundColor) {
      style.backgroundColor = this.props.padBackgroundColor;
    }
    return style;
  }

  headerContentClassName() {
    let className = 'header-content';
    className += this.props.prominent ? ' prominent' : '';
    return className;
  }

  componentWillMount() {
    if (window.drawerRef) {
      window.drawerRef.pushDisplacement();
    }
  }

  componentWillReceiveProps() {
    setTimeout(this.pushDisplacement, 0);
  }

  /*
    TODO: Only push when the dimension does not change.
  */
  pushDisplacement() {
    let dimensions = null;
    if (!window.contentRef && !window.drawerRef) {
      return;
    } else {
      dimensions = this.getContentDisplacement();
    }
    if (window.contentRef) {
      window.contentRef.setAppBarPadding(dimensions.padding, dimensions.offsetHeight);
    }
    if (window.drawerRef) {
      window.drawerRef.setAppBarPadding(dimensions.offsetHeight);
    }
  }

  getContentDisplacement() {
    let dimensions = {};
    let height = this.getHeight();
    dimensions.padding = this.props.fixed ? height : 0;
    dimensions.offsetHeight = height;
    return dimensions;
  }

  setDrawerPadding(padding) {
    if (padding !== this.state.drawerPadding && typeof padding === 'number') {
      this.setState({ drawerPadding: padding });
    }
  }

  getHeight() {
    let height = 0;
    if (this.props.height) {
      return this.props.height;
    }
    height += this.props.padded ? 24 : 0;
    height += this.props.prominent ? 56 + 72 : 56;
    return height;
  }

  render() {
    let passedProps = this.deleteUsedProps(['fixed', 'height', 'prominent', 'padded', 'backgroundColor', 'padBackgroundColor']);
    passedProps = _extends({}, passedProps, {
      className: this.className(),
      style: this.style()
    });
    return React.createElement(
      'div',
      passedProps,
      this.props.padded ? React.createElement(
        'div',
        { className: 'pad-top', style: this.padStyle() },
        this.props.appBarChildren
      ) : null,
      React.createElement(
        'div',
        { className: 'app-bar-header' },
        React.createElement(
          'div',
          { className: this.headerContentClassName() },
          this.props.children
        )
      )
    );
  }
}

AppBar.defaultProps = {
  fixed: true
};

AppBar = Guac(AppBar);

export default AppBar;
export { AppBar };