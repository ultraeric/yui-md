'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingActionButton = exports.IconButton = exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _applyRipple = require('../utils/applyRipple');

var _Icon = require('../Icon');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Generic button, can have text/icon/pictures/etc.

  Option Parameters:
  - circle <boolean>: is circle button or not.
  - iconOnly <boolean>: show only icon or not.
  - large <boolean>: is large icon button or not.
  - hoverShade <boolean>: whether to shade on hover or not.
*/

var defaultOptions = {
  circle: false,
  iconOnly: false,
  large: false,
  depth: 0,
  rounded: true
};

var iconOptions = _extends({}, defaultOptions, {
  circle: true,
  iconOnly: true,
  large: false,
  centerRipple: true
});

var floatingActionOptions = _extends({}, iconOptions, {
  large: true,
  depth: 2,
  centerRipple: false
});

function createButton() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

  options = _extends({}, defaultOptions, options);

  var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
      _classCallCheck(this, Button);

      var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

      _this.bindAllMethods();
      return _this;
    }

    _createClass(Button, [{
      key: 'style',
      value: function style() {
        var style = this.props.style && _extends({}, this.props.style) || {};
        if (this.props.colors) {
          if (this.props.colors.color) {
            style.color = this.props.colors.color;
          }
          if (this.props.colors.backgroundColor) {
            if (this.props.disabled) {
              style.backgroundColor = 'rgba(' + backgroundColor + ', 0.4615)';
            } else {
              style.backgroundColor = this.props.colors.backgroundColor;
            }
          }
        }
        return style;
      }
    }, {
      key: 'className',
      value: function className() {
        var className = 'button';
        className += this.props.circle ? ' circle' : '';
        className += this.props.iconOnly ? ' icon' : '';
        className += this.props.large ? ' large' : '';
        className += this.props.disabled ? ' disabled' : '';
        className += this.props.rounded ? ' rounded' : '';
        return className;
      }
    }, {
      key: 'getIconChild',
      value: function getIconChild() {
        if (this.props.icon) {
          return React.createElement(
            _Icon.Icon,
            null,
            this.props.icon
          );
        } else {
          return null;
        }
      }
    }, {
      key: 'getChildren',
      value: function getChildren() {
        return this.props.children || null;
      }
    }, {
      key: 'getDivider',
      value: function getDivider() {
        if (this.props.icon && this.props.label) {
          return React.createElement('div', { style: { height: '10px' } });
        } else {
          return null;
        }
      }
    }, {
      key: 'getLabelChild',
      value: function getLabelChild() {
        return this.props.label || null;
      }
    }, {
      key: 'onClick',
      value: function onClick(event) {
        var _this2 = this;

        event.persist();
        if (this.props.artificialDelay) {
          setTimeout(function () {
            return _this2.props.onClick && _this2.props.onClick(event);
          }, this.props.artificialDelay);
        } else {
          this.props.onClick && this.props.onClick(event);
        }
        event.stopPropagation();
      }
    }, {
      key: 'render',
      value: function render() {
        //Guac-HOC doesn't delete when type is falsey, i.e. 0, '', [], etc.
        var passedProps = this.deleteUsedProps(['rippleComponents', 'intId', 'activeId', 'active', 'circle', 'iconOnly', 'large', 'depth', 'centerRipple']);
        passedProps = _extends({}, passedProps, {
          className: this.className(),
          onClick: this.onClick,
          style: this.style()
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
    }]);

    return Button;
  }(React.Component);

  ;
  Button.defaultProps = options;
  return (0, _applyRipple.applyRipple)((0, _Guac.Guac)(Button), options);
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
    - borderColor: border color
  - rounded <boolean>: rounded or not.
  - artificialDelay <int>: ms for artificial delay
*/
var Button = createButton();
var IconButton = createButton(iconOptions);
var FloatingActionButton = createButton(floatingActionOptions);

exports.default = Button;
exports.Button = Button;
exports.IconButton = IconButton;
exports.FloatingActionButton = FloatingActionButton;