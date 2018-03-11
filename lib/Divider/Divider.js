'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = undefined;

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
  - vertical <boolean>: whether or not this is vertical.
  - horizontal <boolean>: whether or not this is horizontal.
  - inset <boolean>: inset or not.
  - margin <boolean>: whether or not to include margin.
*/
var Divider = function (_React$Component) {
  _inherits(Divider, _React$Component);

  function Divider() {
    _classCallCheck(this, Divider);

    var _this = _possibleConstructorReturn(this, (Divider.__proto__ || Object.getPrototypeOf(Divider)).call(this));

    _this.bindAllMethods();
    return _this;
  }

  _createClass(Divider, [{
    key: 'className',
    value: function className() {
      var className = 'divider';
      className += this.props.vertical ? ' vertical' : '';
      className += this.props.horizontal ? ' horizontal' : '';
      className += !this.props.margin ? ' no-margin' : '';
      className += this.props.inset ? ' inset' : '';
      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: this.className() });
    }
  }]);

  return Divider;
}(React.Component);

Divider.defaultProps = {
  margin: false,
  inset: false
};

exports.Divider = Divider = (0, _Guac2.default)(Divider);

exports.default = Divider;
exports.Divider = Divider;