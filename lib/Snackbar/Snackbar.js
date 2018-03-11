'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultDuration = 5000;
var consecutiveDuration = 3000;
var snackQueue = [];
var currentTimeoutFunc = null;
var isQueuing = false;

window.triggerSnackbar = function (message, actionMessage, action) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultDuration;

  window.snackbar.triggerSnackbar(message, actionMessage, action, duration);
};

/*
*/

var Snackbar = function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  function Snackbar() {
    _classCallCheck(this, Snackbar);

    var _this = _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call(this));

    _this.bindAllMethods();
    _this.state = {
      active: false,
      message: null,
      actionMessage: null,
      action: null
    };
    return _this;
  }

  _createClass(Snackbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.snackbar = this;
    }
  }, {
    key: 'triggerSnackbar',
    value: function triggerSnackbar(message, actionMessage, action, duration) {
      duration = duration || defaultDuration;
      snackQueue.push({ message: message, actionMessage: actionMessage, action: action, duration: duration });
      if (!currentTimeoutFunc || !isQueuing) {
        this.updateSnackbar();
      }
    }
  }, {
    key: 'updateSnackbar',
    value: function updateSnackbar() {
      var _this2 = this;

      var scheduleSnackEvents = function scheduleSnackEvents(snack) {
        setTimeout(function () {
          return _this2.setState({ active: true,
            message: snack.message,
            actionMessage: snack.actionMessage,
            action: snack.action
          });
        }, 0);
        setTimeout(_this2.updateSnackbar, consecutiveDuration);
        currentTimeoutFunc = setTimeout(function () {
          resetSnackbar();
        }, snack.duration);
      };

      var resetSnackbar = function resetSnackbar() {
        clearTimeout(currentTimeoutFunc);
        setTimeout(function () {
          return _this2.setState({ active: false });
        }, 0);
        currentTimeoutFunc = setTimeout(function () {
          currentTimeoutFunc = null;
          _this2.updateSnackbar();
        }, 600);
      };

      //If a snackbar needs to be shown
      if (snackQueue.length > 0) {
        isQueuing = true;
        //Check if a current snackbar is being shown
        if (currentTimeoutFunc) {
          //If so, reset it.
          resetSnackbar();
        } else {
          //If not, get the first snack in the queue and schedule its events.
          var snack = snackQueue[0];
          snackQueue = snackQueue.slice(1, snackQueue.length);
          scheduleSnackEvents(snack);
        }
      } else {
        isQueuing = false;
      }
    }
  }, {
    key: 'className',
    value: function className() {
      var className = 'snackbar';
      className += this.state.active ? ' active' : '';

      return className;
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['active']);
      var action = this.state.action || function () {
        return null;
      };
      return React.createElement(
        'div',
        _extends({}, passedProps, { className: this.className() }),
        this.state.message,
        React.createElement(
          _Button2.default,
          { className: 'snackbar-button', onClick: action },
          this.state.actionMessage
        )
      );
    }
  }]);

  return Snackbar;
}(React.Component);

exports.Snackbar = Snackbar = (0, _Guac2.default)(Snackbar);

exports.default = Snackbar;
exports.Snackbar = Snackbar;