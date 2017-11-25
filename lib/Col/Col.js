'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Col = undefined;

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
  NOTE: 0 size will make the component invisible.
  -xs <int>: flex-size
  -sm <int>: flex-size
  -md <int>: flex-size
  -lg <int>: flex-size
  -reverse <string>: what size to reverse at, separated by spaces
*/
var Col = function (_React$Component) {
  _inherits(Col, _React$Component);

  function Col() {
    _classCallCheck(this, Col);

    var _this = _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).call(this));

    _this.bindAllMethods();
    return _this;
  }

  _createClass(Col, [{
    key: 'className',
    value: function className() {
      var className = 'yui-md-grid-col';
      className += typeof this.props.xs === 'number' ? ' col-xs-' + this.props.xs : '';
      className += typeof this.props.sm === 'number' ? ' col-sm-' + this.props.sm : '';
      className += typeof this.props.md === 'number' ? ' col-md-' + this.props.md : '';
      className += typeof this.props.lg === 'number' ? ' col-lg-' + this.props.lg : '';
      if (this.props.xs === 0 || this.props.sm === 0 || this.props.md === 0 || this.props.lg === 0) {
        className += ' hidden-grid-element';
      }
      var reverses = this.props.reverse ? this.props.reverse.split(' ') : [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = reverses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var reverse = _step.value;

          className += reverse ? ' reverse-' + reverse : '';
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

      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['xs', 'sm', 'md', 'lg']);
      passedProps = _extends({}, passedProps, {
        className: this.className()
      });
      return React.createElement(
        'div',
        passedProps,
        this.props.children
      );
    }
  }]);

  return Col;
}(React.Component);

exports.Col = Col = (0, _Guac2.default)(Col);

exports.default = Col;
exports.Col = Col;