'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyRipple = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _timingUtils = require('../timingUtils');

var _Hoc = require('guac-hoc/lib/Hoc');

var _Hoc2 = _interopRequireDefault(_Hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalDefaults = {
  rippleFilter: function rippleFilter() {
    return true;
  },
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

};function applyRipple(WrappedComponent) {
  var defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaults = _extends({}, globalDefaults, defaultOptions);
  //An overlay component for the Ripple
  /*
    Props:
    - ripple <boolean>: whether or not to ripple on click.
    - light <boolean>: whether the ripple should be light or dark.
  */

  var WrappedRipple = function (_React$Component) {
    _inherits(WrappedRipple, _React$Component);

    function WrappedRipple() {
      _classCallCheck(this, WrappedRipple);

      var _this = _possibleConstructorReturn(this, (WrappedRipple.__proto__ || Object.getPrototypeOf(WrappedRipple)).call(this));

      _this.bindAllMethods();

      //Track the current ripple number.
      _this.index = 0;
      //Track the current number of ripples that need to be removed.
      _this.numToRemove = 0;
      _this.touchEnded = 0;
      _this.state = {
        rippleComponents: []
      };
      return _this;
    }

    _createClass(WrappedRipple, [{
      key: 'className',
      value: function className() {
        return 'ripple-container';
      }

      // Ripple if the `ripple` prop is not provided, or if it is true, and if
      // `defaults.rippleFilter` returns true or is not provided

    }, {
      key: 'onMouseDown',
      value: function onMouseDown(event) {
        if ((typeof this.props.ripple === 'undefined' || this.props.ripple) && (defaults.rippleFilter && defaults.rippleFilter.apply(defaults, arguments) || !defaults.rippleFilter)) {
          event.persist();
          this.startRipple(event);
        }
      }

      //Called on click

    }, {
      key: 'startRipple',
      value: function startRipple(event) {
        //Gets the rippleContainer DOM node for calculations
        var rippleSize = this.calcRippleSize(event);
        var rippleCoords = this.calcRippleCoords(event, rippleSize);

        rippleCoords ? this.renderRipple(rippleCoords, rippleSize) : null;
      }
    }, {
      key: 'stopRipple',
      value: function stopRipple(event) {
        var _this2 = this;

        var rippleComponents = this.state.rippleComponents;
        if (rippleComponents.length === 0) {
          return;
        }
        var rippleComponent = rippleComponents[rippleComponents.length - 1];
        rippleComponents[rippleComponents.length - 1] = React.cloneElement(rippleComponent, { className: this.rippleClassName() + ' ripple-fade' });
        window.requestAnimationFrame(function () {
          return _this2.setState({ rippleComponents: rippleComponents });
        });
      }

      //Gets DOM Node of container and returns max of its width and height

    }, {
      key: 'calcRippleSize',
      value: function calcRippleSize(event) {
        this.rippleBounds = ReactDOM.findDOMNode(this.rippleContainerNode).getBoundingClientRect();
        if (defaults.centerRipple) {
          return Math.max((this.rippleBounds.right - this.rippleBounds.left) / 2, (this.rippleBounds.bottom - this.rippleBounds.top) / 2);
        } else {
          return Math.max(Math.abs(event.clientX - this.rippleBounds.left), Math.abs(event.clientX - this.rippleBounds.right), Math.abs(event.clientY - this.rippleBounds.top), Math.abs(event.clientY - this.rippleBounds.bottom));
        }
      }
      //Gets originating coordinates of the click relative to component

    }, {
      key: 'calcRippleCoords',
      value: function calcRippleCoords(event, rippleSize) {
        if (event.clientX < this.rippleBounds.left || event.clientX > this.rippleBounds.right || event.clientY > this.rippleBounds.bottom || event.clientY < this.rippleBounds.top) {
          return null;
        }

        if (defaults.centerRipple) {
          return { x: rippleSize / 2, y: rippleSize / 2 };
        }

        //Top left corner of bounding box for ripple animation relative to top left of parent
        var x = event.clientX - this.rippleBounds.left - rippleSize / 2;
        var y = event.clientY - this.rippleBounds.top - rippleSize / 2;

        return { x: x, y: y };
      }
    }, {
      key: 'rippleClassName',
      value: function rippleClassName() {
        var className = 'ripple-effect';
        className += this.props.light ? ' light' : '';
        return className;
      }

      //Renders the ripple animation

    }, {
      key: 'renderRipple',
      value: function renderRipple(rippleCoords, rippleSize) {
        var _this3 = this;

        var rippleComponents = this.state.rippleComponents;
        var rippleDuration = 3 * (0, _timingUtils.getAnimationTimeBySize)(rippleSize);
        rippleComponents.push(React.createElement('div', { style: { left: rippleCoords.x,
            top: rippleCoords.y,
            width: rippleSize,
            height: rippleSize,
            animationDuration: rippleDuration + 's' },
          className: this.rippleClassName(),
          key: this.index }));
        rippleComponents = rippleComponents.slice(this.numToRemove, rippleComponents.length);
        this.numToRemove = 0;
        window.requestAnimationFrame(function () {
          return _this3.setState({ rippleComponents: rippleComponents });
        });
        this.index += 1;
        setTimeout(function () {
          return _this3.numToRemove += 1;
        }, rippleDuration * 1000);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        //Copy over user props
        var passedProps = this.deleteUsedProps(['children', 'ripple', 'centerRipple']);
        passedProps = _extends({}, passedProps, {
          ref: function ref(node) {
            return _this4.rippleContainerNode = node;
          },
          className: this.className(),
          onMouseDown: this.onMouseDown,
          onMouseUp: this.stopRipple,
          onMouseLeave: this.stopRipple,
          onTouchStart: this.onMouseDown,
          onTouchEnd: this.stopRipple,
          onTouchCancel: this.stopRipple
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
    }]);

    return WrappedRipple;
  }(React.Component);

  return (0, _Hoc2.default)(WrappedRipple);
}

exports.default = applyRipple;
exports.applyRipple = applyRipple;