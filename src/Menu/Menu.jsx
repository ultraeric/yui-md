import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Guac from 'guac-hoc/lib/Guac';
import MenuItem from '../MenuItem';

let menuOptions = {
  depth: 1
};

let index = 0;
let globalMenus = new Set();

function refreshMenus(event) {
  for (var menu of globalMenus) {
    setTimeout((function(menu) {return () => menu.checkShouldClose(event);})(menu), 0);
  }
}

document.addEventListener('click', (event) => setTimeout(refreshMenus(event), 0));

/*
  Props:
    - active <boolean>: whether or not to show the menu.
    - setActive(boolean) <function>: function to call to set visibility.
    - dense <boolean>: dense layout or not.
    - anchor <string>: anchor corner of menu. <'top', 'bottom'> + <'left', 'right'>
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
    let verticalAnchor = this.props.anchor.includes('bottom') ? 'bottom' : 'top';
    let horizontalAnchor = this.props.anchor.includes('right') ? 'right' : 'left';
    if (position.includes('top')) {
      style[verticalAnchor] = verticalAnchor === 'top' ? '0px' : '100%';
    } else if (position.includes('bottom')) {
      style[verticalAnchor] = verticalAnchor === 'bottom' ? '0px' : '100%';
    }
    if (position.includes('left')) {
      style[horizontalAnchor] = horizontalAnchor === 'left' ? '0px' : '100%';
    } else if (position.includes('right')) {
      style[horizontalAnchor] = horizontalAnchor === 'right' ? '0px' : '100%';
    }
    style.transformOrigin = this.props.anchor;
    style.position = 'absolute';
    return style;
  }


  checkOutsideBoundingBox(boundingBox, x, y) {
    return (
      boundingBox.top > y ||
      boundingBox.bottom < y ||
      boundingBox.left > x ||
      boundingBox.right < x
    );
  }

  checkShouldClose(event) {
    if (!this.DOMNode) {return false;}
    let parentBoundingBox = this.DOMNode.parentNode.getBoundingClientRect();
    let boundingBox = this.DOMNode.getBoundingClientRect();
    if (this.checkOutsideBoundingBox(boundingBox, event.clientX, event.clientY) &&
        this.checkOutsideBoundingBox(parentBoundingBox, event.clientX, event.clientY)) {
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
    let passedProps = this.deleteUsedProps(['active', 'setActive', 'position', 'expand', 'dense', 'fastExpand', 'anchor']);

    let children = React.Children.toArray(this.props.children);
    let numShownTabs = children.length;
    let newChildren = [];

    //Re-render children to add props
    for (let i = 0; i < children.length; i++) {
      var newChild;
      if (children[i].type === MenuItem) {
        newChild = React.cloneElement(children[i], {dense: this.props.dense});
      } else {
        newChild = children[i];
      }
      newChildren.push(newChild);
    }

    passedProps = {
      ...passedProps,
      className: this.className(),
      style: this.style(),
      ref: (node) => this.DOMNode = ReactDOM.findDOMNode(node)
    };
    return (
      <div {...passedProps}>
        {this.props.children}
      </div>
    );
  }
}

Menu.defaultProps = {
  position: 'bottom left',
  anchor: 'top left',
  expand: 'both',
  dense: true
}

Menu = Guac(Menu);

export default Menu;
export {Menu};
