'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Props:
  - label <string>: label
  - value <string>: value of input
  - changeValue <function<string>>: function that changes value
*/

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.bindAllMethods();
    return _this;
  }

  _createClass(Input, [{
    key: 'onChange',
    value: function onChange(event) {
      this.props.changeValue(event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps([]);
      passedProps = _extends({}, passedProps);

      return React.createElement(
        'div',
        null,
        React.createElement('input', _extends({ type: 'text', onChange: this.onChange }, passedProps)),
        React.createElement(
          'label',
          { className: 'text-input-label' },
          this.props.label
        )
      );
    }
  }]);

  return Input;
}(React.Component);

/*
  Props:
  - label <string>
  - options <object>
  - selected <string>: key of the selected option
  - setSelected <function<key>>: function that changes which key is selected
*/


var Dropdown = function (_React$Component2) {
  _inherits(Dropdown, _React$Component2);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    var _this2 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

    _this2.bindAllMethods();
    return _this2;
  }

  _createClass(Dropdown, [{
    key: 'getOptionComponents',
    value: function getOptionComponents(options, selected) {
      var optionComponents = [];
      for (var key in options) {
        optionComponents.push(React.createElement(
          'option',
          { key: key, value: key },
          options[key]
        ));
      }
      return optionComponents;
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.props.setSelected(event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props.selected);
      var passedProps = this.deleteUsedProps([]);
      passedProps = _extends({}, passedProps);
      return React.createElement(
        'div',
        null,
        React.createElement('div', { style: { height: '12px' } }),
        React.createElement(
          'label',
          { className: 'text-input-label' },
          this.props.label
        ),
        React.createElement(
          'select',
          { name: 'dropdown', value: this.props.selected, onChange: this.onChange },
          this.getOptionComponents(this.props.options, this.props.selected)
        )
      );
    }
  }]);

  return Dropdown;
}(React.Component);

exports.Input = Input = (0, _Guac2.default)(Input);
exports.Dropdown = Dropdown = (0, _Guac2.default)(Dropdown);

exports.default = Input;
exports.Input = Input;
exports.Dropdown = Dropdown;