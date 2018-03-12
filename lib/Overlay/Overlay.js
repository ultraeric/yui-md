'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _utils = require('guac-hoc/lib/utils');

var utils = _interopRequireWildcard(_utils);

var _applyRipple = require('../utils/applyRipple');

var _applyRipple2 = _interopRequireDefault(_applyRipple);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overlayOptions = {
  rippleFilter: function rippleFilter(event) {
    return true;
  }
  /*
    Props:
    - ripple <boolean>: whether or not to ripple on overlay click.
    - active <boolean>: whether the overlay is active or not.
    - fadeChildren <boolean>: whether to fade out children or not.
  */
};
var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this));

    _this.bindAllMethods();
    return _this;
  }

  _createClass(Overlay, [{
    key: 'className',
    value: function className() {
      var className = 'overlay';
      className += !this.props.active ? ' inactive' : '';
      return className;
    }
  }, {
    key: 'style',
    value: function style() {
      var style = {};
      if (this.props.backgroundColor) {
        style.backgroundColor = this.props.backgroundColor;
      }
      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['children', 'active', 'rippleComponents']);

      //TODO: Fix the active prop in Guac-HOC package
      passedProps = _extends({}, passedProps, {
        className: this.className(),
        onClick: this.onClick,
        style: this.style()
      });

      return React.createElement(
        'div',
        { className: 'overlay-container ' + (this.props.active ? '' : 'inactive ') + (this.props.fadeChildren ? 'fade-children ' : ''), style: this.style() },
        React.createElement(
          'div',
          { className: 'overlay-children' },
          this.props.children
        ),
        React.createElement(
          'div',
          passedProps,
          this.props.rippleComponents
        )
      );
    }
  }]);

  return Overlay;
}(React.Component);

exports.Overlay = Overlay = (0, _applyRipple2.default)((0, _Guac2.default)(Overlay), overlayOptions);

exports.default = Overlay;
exports.Overlay = Overlay;