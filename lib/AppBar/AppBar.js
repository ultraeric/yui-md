'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var AppBar = function (_React$Component) {
  _inherits(AppBar, _React$Component);

  function AppBar() {
    _classCallCheck(this, AppBar);

    var _this = _possibleConstructorReturn(this, (AppBar.__proto__ || Object.getPrototypeOf(AppBar)).call(this));

    _this.bindAllMethods();
    window.appBarRef = _this;
    _this.state = {
      drawerPadding: 0
    };
    return _this;
  }

  _createClass(AppBar, [{
    key: 'className',
    value: function className() {
      var className = 'app-bar';
      className += this.props.fixed ? ' fixed' : '';
      className += this.props.prominent ? ' prominent' : '';
      return className;
    }
  }, {
    key: 'style',
    value: function style() {
      var style = { marginLeft: this.state.drawerPadding,
        minHeight: this.getHeight() };
      if (this.props.backgroundColor) {
        style.backgroundColor = this.props.backgroundColor;
      }
      return style;
    }
  }, {
    key: 'padStyle',
    value: function padStyle() {
      var style = {};
      if (this.props.padBackgroundColor) {
        style.backgroundColor = this.props.padBackgroundColor;
      }
      return style;
    }
  }, {
    key: 'headerContentClassName',
    value: function headerContentClassName() {
      var className = 'header-content';
      className += this.props.prominent ? ' prominent' : '';
      return className;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (window.drawerRef) {
        window.drawerRef.pushDisplacement();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      setTimeout(this.pushDisplacement, 0);
    }

    /*
      TODO: Only push when the dimension does not change.
    */

  }, {
    key: 'pushDisplacement',
    value: function pushDisplacement() {
      var dimensions = null;
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
  }, {
    key: 'getContentDisplacement',
    value: function getContentDisplacement() {
      var dimensions = {};
      var height = this.getHeight();
      dimensions.padding = this.props.fixed ? height : 0;
      dimensions.offsetHeight = height;
      return dimensions;
    }
  }, {
    key: 'setDrawerPadding',
    value: function setDrawerPadding(padding) {
      if (padding !== this.state.drawerPadding && typeof padding === 'number') {
        this.setState({ drawerPadding: padding });
      }
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var height = 0;
      if (this.props.height) {
        return this.props.height;
      }
      height += this.props.padded ? 24 : 0;
      height += this.props.prominent ? 56 + 72 : 56;
      return height;
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['fixed', 'height', 'prominent', 'padded', 'backgroundColor', 'padBackgroundColor']);
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
  }]);

  return AppBar;
}(React.Component);

AppBar.defaultProps = {
  fixed: true
};

exports.AppBar = AppBar = (0, _Guac2.default)(AppBar);

exports.default = AppBar;
exports.AppBar = AppBar;