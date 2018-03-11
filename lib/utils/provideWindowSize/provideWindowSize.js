'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideWindowSize = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Hoc = require('guac-hoc/lib/Hoc');

var _Hoc2 = _interopRequireDefault(_Hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var windowSize = { width: 0, height: 0 };
var componentsToUpdate = new Set(); //add components here so the window knows which components to force update on
var componentsToRemove = new Set();
var lastUpdate = new Date();
var updateDelay = 500; //in milliseconds

var push = function pushWindowSizeToComponents(fromActiveCallback) {
  if (!fromActiveCallback && window.waitingWindowSizer) {
    return;
  }

  window.waitingWindowSizer = true;
  var newTime = new Date();
  if (newTime - lastUpdate >= updateDelay) {
    //Removes any components that need to be removed
    for (var item in componentsToRemove) {
      componentsToUpdate.delete(item);
    }
    windowSize = { width: window.innerWidth, height: window.innerHeight };
    //Forces the update
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = componentsToUpdate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        //Closure to keep reference to item.
        item.updateWindowSize(windowSize);
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

    window.waitingWindowSizer = false;
  } else {
    setTimeout(function () {
      return push(true);
    }, updateDelay);
  }
  lastUpdate = newTime;
};

window.forceComponentsToUpdate = function (componentsToUpdate) {
  return function () {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = componentsToUpdate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;

        item.forceUpdate();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
}(componentsToUpdate);

//Initializes the window size on window load.
window.addEventListener('load', push);

//Adds an event to window on resize that updates all components wrapped in provideWindowSize
window.addEventListener('resize', function () {
  return setTimeout(push, 0);
});

//HOC function that provides windowSize prop to child. {width, height}. This is in CSS px
function provideWindowSize(WrappedComponent) {
  var WindowSizeWrapped = function (_React$Component) {
    _inherits(WindowSizeWrapped, _React$Component);

    function WindowSizeWrapped() {
      _classCallCheck(this, WindowSizeWrapped);

      var _this = _possibleConstructorReturn(this, (WindowSizeWrapped.__proto__ || Object.getPrototypeOf(WindowSizeWrapped)).call(this));

      _this.bindAllMethods();

      //Keeps the state which is updated for rendering later. Initialized to the
      //window size.
      windowSize = { width: window.innerWidth, height: window.innerHeight };
      _this.state = { windowSize: windowSize };
      return _this;
    }

    //On mount, adds this component to the set of components to track


    _createClass(WindowSizeWrapped, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!window.isServer) {
          componentsToUpdate.add(this);
        }
      }

      //On unmount, queues this component for removal during next update

    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        componentsToRemove.add(this);
      }

      //Updates the window size state, forces render

    }, {
      key: 'updateWindowSize',
      value: function updateWindowSize(windowSize) {
        this.setState({
          windowSize: windowSize
        });
      }

      //Renders component in HOC context

    }, {
      key: 'render',
      value: function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, { windowSize: this.state.windowSize }));
      }
    }]);

    return WindowSizeWrapped;
  }(React.Component);

  WindowSizeWrapped = (0, _Hoc2.default)(WindowSizeWrapped);
  return WindowSizeWrapped;
}

exports.default = provideWindowSize;
exports.provideWindowSize = provideWindowSize;