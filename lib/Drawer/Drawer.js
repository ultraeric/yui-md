'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _provideSizeClass = require('../utils/provideSizeClass');

var _provideSizeClass2 = _interopRequireDefault(_provideSizeClass);

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  NOTE: There should only be a single navigational drawer in your application.
  To render different information in your drawer, it is best to create several
  "pages" that the drawer can be given to render.

  Props:
  - active <boolean>: whether or not this drawer should be shown
  - s, m, l <boolean>: which sizeClass the window is in.
  - setActive(boolean) <function>: set the drawer as open or closed
  - onOverlayClickClose <boolean>: whether to close drawer on overlay click
  - temporary, persistent, permanent <boolean>: type of drawer
  - clipped <boolean>: Whether or not the app bar clips the drawer.
*/
var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _this.bindAllMethods();
    window.drawerRef = _this;
    _this.state = {
      drawerType: _this.getDrawerType(props),
      active: true,
      appBarPadding: 0
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: 'isActive',
    value: function isActive() {
      if (typeof this.props.active !== 'undefined') {
        return this.props.active;
      } else {
        return this.state.active;
      }
    }
  }, {
    key: 'getDrawerType',
    value: function getDrawerType(props) {
      var drawerType = props.temporary || props.persistent || props.permanent;
      if (drawerType ? props.temporary : props.s || props.m) {
        return 'temporary';
      } else if (drawerType ? props.persistent : false) {
        return 'persistent';
      } else if (drawerType ? props.permanent : props.l) {
        return 'permanent';
      }
      return null;
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      if (this.props.onOverlayClickClose) {
        if (typeof this.props.active === 'undefined') {
          //Internally handled when this.props.active not passed
          this.setState({ active: false });
        } else if (this.props.setActive) {
          //Externally happened when passed a function and visibility.
          this.props.setActive(false);
        }
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (window.appBarRef) {
        window.appBarRef.pushDisplacement();
      }
      this.pushDisplacement();
    }
  }, {
    key: 'pushDisplacement',
    value: function pushDisplacement() {
      if (window.contentRef) {
        if (this.state.drawerType === 'temporary' || !this.props.visible && this.state.drawerType !== 'permanent') {
          window.contentRef.setDrawerPadding(0);
        } else {
          window.contentRef.setDrawerPadding(this.getWidth());
        }
      }
      if (window.appBarRef) {
        if (!this.props.clipped && (this.props.visible || this.state.drawerType === 'permanent')) {
          window.appBarRef.setDrawerPadding(this.getWidth());
        } else {
          window.appBarRef.setDrawerPadding(0);
        }
      }
    }

    /*
      Gets width, assuming active.
    */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      if (this.props.s) {
        return 280;
      } else {
        return 320;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var newDrawerType = this.getDrawerType(newProps);
      setTimeout(this.pushDisplacement, 0);
      if (newDrawerType !== this.state.drawerType) {
        this.setState({ drawerType: this.getDrawerType(newProps) });
      }
    }
  }, {
    key: 'setAppBarPadding',
    value: function setAppBarPadding(padding) {
      if (padding !== this.state.appBarPadding) {
        this.setState({ appBarPadding: padding });
      }
    }
  }, {
    key: 'style',
    value: function style() {
      var style = {};
      if (this.state.drawerType !== 'temporary' && this.props.clipped) {
        style = { marginTop: this.state.appBarPadding + 'px' };
      }
      return style;
    }
  }, {
    key: 'overlayStyle',
    value: function overlayStyle() {
      var style = {};
      return style;
    }
  }, {
    key: 'className',
    value: function className() {
      var className = 'drawer z-depth-';
      if (this.state.drawerType === 'temporary' && this.props.active) {
        className += '8';
      } else {
        className += '1';
      }
      if (!this.props.active && this.state.drawerType !== 'permanent') {
        className += ' inactive';
      }
      if (this.props.s) {
        className += ' s';
      } else if (this.props.m) {
        className += ' m';
      } else if (this.props.l) {
        className += ' l';
      }
      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['active', 'onOverlayClick', 'children', 'setActive', 's', 'm', 'l', 'onOverlayClickClose']);
      passedProps = _extends({}, passedProps, {
        className: this.className(),
        style: this.style()
      });

      return React.createElement(
        _Overlay2.default,
        { active: this.state.drawerType === 'temporary' && this.props.active,
          onClick: this.onClick,
          ripple: true,
          style: this.overlayStyle() },
        React.createElement(
          'div',
          { style: { backgroundColor: 'transparent' } },
          React.createElement(
            'div',
            passedProps,
            this.props.children
          )
        )
      );
    }
  }]);

  return Drawer;
}(React.Component);

Drawer.defaultProps = {
  onOverlayClickClose: true
};

exports.Drawer = Drawer = (0, _provideSizeClass2.default)((0, _Guac2.default)(Drawer));

exports.default = Drawer;
exports.Drawer = Drawer;