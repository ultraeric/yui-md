'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardImageArea = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _Col = require('../Col');

var _Col2 = _interopRequireDefault(_Col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Props:
  - Inherits from Col props
*/
var CardImageArea = function (_React$Component) {
  _inherits(CardImageArea, _React$Component);

  function CardImageArea() {
    _classCallCheck(this, CardImageArea);

    var _this = _possibleConstructorReturn(this, (CardImageArea.__proto__ || Object.getPrototypeOf(CardImageArea)).call(this));

    _this.bindAllMethods();
    return _this;
  }

  _createClass(CardImageArea, [{
    key: 'className',
    value: function className() {
      return 'card-image-area';
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps([]);
      passedProps = _extends({}, passedProps, {
        className: this.className()
      });
      return React.createElement(
        _Col2.default,
        passedProps,
        this.props.children
      );
    }
  }]);

  return CardImageArea;
}(React.Component);

exports.CardImageArea = CardImageArea = (0, _Guac2.default)(CardImageArea);

exports.default = CardImageArea;
exports.CardImageArea = CardImageArea;