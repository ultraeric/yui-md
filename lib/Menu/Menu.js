'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuOptions = {
  depth: 1
};

var index = 0;
var globalMenus = new Set();

function refreshMenus(event) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = globalMenus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var menu = _step.value;

      setTimeout(function (menu) {
        return function () {
          return menu.checkShouldClose(event);
        };
      }(menu), 0);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

document.addEventListener('click', function (event) {
  return setTimeout(refreshMenus(event), 0);
});

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

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

    _this.bindAllMethods();
    _this.index = index;
    return _this;
  }

  _createClass(Menu, [{
    key: 'className',
    value: function className() {
      var className = 'menu';
      var expand = this.props.expand || '';
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
  }, {
    key: 'style',
    value: function style() {
      var style = {};
      var position = this.props.position || '';
      var verticalAnchor = this.props.anchor.includes('bottom') ? 'bottom' : 'top';
      var horizontalAnchor = this.props.anchor.includes('right') ? 'right' : 'left';
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
  }, {
    key: 'checkOutsideBoundingBox',
    value: function checkOutsideBoundingBox(boundingBox, x, y) {
      return boundingBox.top > y || boundingBox.bottom < y || boundingBox.left > x || boundingBox.right < x;
    }
  }, {
    key: 'checkShouldClose',
    value: function checkShouldClose(event) {
      if (!this.DOMNode) {
        return false;
      }
      var parentBoundingBox = this.DOMNode.parentNode.getBoundingClientRect();
      var boundingBox = this.DOMNode.getBoundingClientRect();
      if (this.checkOutsideBoundingBox(boundingBox, event.clientX, event.clientY) && this.checkOutsideBoundingBox(parentBoundingBox, event.clientX, event.clientY)) {
        this.props.setActive && this.props.setActive(false);
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      globalMenus.add(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      globalMenus.delete(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var passedProps = this.deleteUsedProps(['active', 'setActive', 'position', 'expand', 'dense', 'fastExpand', 'anchor']);

      var children = React.Children.toArray(this.props.children);
      var numShownTabs = children.length;
      var newChildren = [];

      //Re-render children to add props
      for (var i = 0; i < children.length; i++) {
        var newChild;
        if (children[i].type === _MenuItem2.default) {
          newChild = React.cloneElement(children[i], { dense: this.props.dense });
        } else {
          newChild = children[i];
        }
        newChildren.push(newChild);
      }

      passedProps = _extends({}, passedProps, {
        className: this.className(),
        style: this.style(),
        ref: function ref(node) {
          return _this2.DOMNode = ReactDOM.findDOMNode(node);
        }
      });
      return React.createElement(
        'div',
        passedProps,
        this.props.children
      );
    }
  }]);

  return Menu;
}(React.Component);

Menu.defaultProps = {
  position: 'bottom left',
  anchor: 'top left',
  expand: 'both',
  dense: true
};

exports.Menu = Menu = (0, _Guac2.default)(Menu);

exports.default = Menu;
exports.Menu = Menu;