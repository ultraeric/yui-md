var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/style.scss';
import Guac from 'guac-hoc/lib/Guac';
import MenuItem from '../MenuItem';

let menuOptions = {
  depth: 1
};

let index = 0;
let globalMenus = new Set();

function refreshMenus(event) {
  for (var menu of globalMenus) {
    setTimeout(() => menu.checkShouldClose(event), 0);
  }
}

document.addEventListener('click', event => setTimeout(refreshMenus(event), 0));

/*
  Props:
    - active <boolean>: whether or not to show the menu.
    - setActive(boolean) <function>: function to call to set visibility.
    - dense <boolean>: dense layout or not.
    - position <string>: anchor position of menu on parent Component. <'top', 'bottom'> + <'left', 'right'>
    - expand <string>: expansion direction of menu. 'horizontal' or 'vertical';
    - fastExpand <boolean>: expand quickly or not.
*/
class Menu extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.index = index;
  }

  className() {
    let className = 'menu';
    let expand = this.props.expand || '';
    className += !this.props.active ? ' hidden' : '';
    className += this.props.fastExpand ? ' fast-expand' : '';

    if (expand.includes('horizontal')) {
      className += ' expand-horizontal';
    } else if (expand.includes('vertical')) {
      className += ' expand-vertical';
    } else {
      className += ' expand-both';
    }

    return className;
  }

  style() {
    let style = {};
    let position = this.props.position || '';
    if (position.includes('top')) {
      style.top = '0px';
    } else if (position.includes('bottom')) {
      style.top = '100%';
    }
    if (position.includes('left')) {
      style.left = '0px';
    } else if (position.includes('right')) {
      style.left = '100%';
    }
    style.position = 'absolute';
    return style;
  }

  checkOutsideBoundingBox(boundingBox, x, y) {
    return boundingBox.top > y || boundingBox.bottom < y || boundingBox.left > x || boundingBox.right < x;
  }

  checkShouldClose(event) {
    if (!this.DOMNode) {
      return false;
    }
    let parentBoundingBox = this.DOMNode.parentNode.getBoundingClientRect();
    let boundingBox = this.DOMNode.getBoundingClientRect();
    if (this.checkOutsideBoundingBox(boundingBox, event.clientX, event.clientY) && this.checkOutsideBoundingBox(parentBoundingBox, event.clientX, event.clientY)) {
      this.props.setActive && this.props.setActive(false);
      return true;
    } else {
      return false;
    }
  }

  componentWillMount() {
    globalMenus.add(this);
  }

  componentWillUnmount() {
    globalMenus.delete(this);
  }

  render() {
    let passedProps = this.deleteUsedProps(['active', 'setActive', 'position', 'expand', 'dense', 'fastExpand']);

    let children = React.Children.toArray(this.props.children);
    let numShownTabs = children.length;
    let newChildren = [];

    //Re-render children to add props
    for (let i = 0; i < children.length; i++) {
      var newChild;
      if (children[i].type === MenuItem) {
        newChild = React.cloneElement(children[i], { dense: this.props.dense });
      } else {
        newChild = children[i];
      }
      newChildren.push(newChild);
    }

    passedProps = _extends({}, passedProps, {
      className: this.className(),
      style: this.style(),
      ref: node => this.DOMNode = ReactDOM.findDOMNode(node)
    });
    return React.createElement(
      'div',
      passedProps,
      this.props.children
    );
  }
}

Menu.defaultProps = {
  position: 'bottom',
  expand: 'both',
  dense: true
};

Menu = Guac(Menu);

export default Menu;
export { Menu };