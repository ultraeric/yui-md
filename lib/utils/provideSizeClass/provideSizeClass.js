'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideSizeClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Hoc = require('guac-hoc/lib/Hoc');

var _Hoc2 = _interopRequireDefault(_Hoc);

var _provideWindowSize = require('../provideWindowSize');

var _provideWindowSize2 = _interopRequireDefault(_provideWindowSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//HOC function that provides screenType prop 'l', 'm', or 's' to child
function provideSizeClass(WrappedComponent) {
  var SizeClassWrapped = function (_React$Component) {
    _inherits(SizeClassWrapped, _React$Component);

    function SizeClassWrapped(props) {
      _classCallCheck(this, SizeClassWrapped);

      var _this = _possibleConstructorReturn(this, (SizeClassWrapped.__proto__ || Object.getPrototypeOf(SizeClassWrapped)).call(this, props));

      _this.bindAllMethods();

      _this.state = {
        sizeClass: _this.getSizeClass(props.windowSize)
      };
      return _this;
    }

    //Gets the size class based on common cutoffs (980, 480 px)


    _createClass(SizeClassWrapped, [{
      key: 'getSizeClass',
      value: function getSizeClass(size) {
        // size = (size.width < size.height) ? size : {width: size.height, height: size.width};
        if (!size.width || !size.height) {
          return 'noClassSize';
        }
        if (size.width >= 980) {
          return 'l';
        } else if (size.width >= 480) {
          return 'm';
        } else if (size.width < 480) {
          return 's';
        }
      }

      //On a prop update, update size class

    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
        this.setState({
          sizeClass: this.getSizeClass(newProps.windowSize)
        });
      }

      //Renders component in HOC context

    }, {
      key: 'render',
      value: function render() {
        var passProps = this.deleteUsedProps(['windowSize']);
        passProps[this.state.sizeClass] = true;

        this.deleteUsedProps(['windowSize']);

        return React.createElement(WrappedComponent, passProps);
      }
    }]);

    return SizeClassWrapped;
  }(React.Component);

  SizeClassWrapped = (0, _Hoc2.default)(SizeClassWrapped);

  //Returns HOC with window size provided
  return (0, _provideWindowSize2.default)(SizeClassWrapped);
}

exports.default = provideSizeClass;
exports.provideSizeClass = provideSizeClass;