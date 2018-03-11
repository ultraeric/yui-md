'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _Guac = require('guac-hoc/lib/Guac');

var _applyRipple = require('../utils/applyRipple');

var _Button = require('../Button');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Props:
  - label <string>: label to use
  - icon <string>: icon to use
  - tabKey <string/int>: unique key identifying this tab (from User)

  - activeTabKey <string/int>: the current active key (from TabList, external)
  - setActiveTabKey(<string>) <function>: sets the active key (from TabList, external)
  - activeEvent <string>: 'onClick' or 'onMouseOver' or 'both', which to listen to (from TabList, external)

  INTERNAL PROPS:
  - intID <int>: unique integer id (from TabList, internal)
  - activeID <int>: the current active id (from TabList, internal)
  - setActiveID <function>: sets the active intID (from TabList, internal)

  - setIndicatorBox <function>: Sets the indicator box (style) for this tab (from TabList, internal)
*/
window.ReactDOM = ReactDOM;

var Tab = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

    _this.bindAllMethods();
    _this.state = {
      active: _this.isActive()
    };
    props.tabKeyIDMap[props.tabKey] = props.intID;
    return _this;
  }

  _createClass(Tab, [{
    key: 'isUserControlled',
    value: function isUserControlled() {
      return typeof this.props.tabKey !== 'undefined' && typeof this.props.setActiveTabKey !== 'undefined' && typeof this.props.activeTabKey !== 'undefined';
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      if (this.isUserControlled()) {
        if (typeof this.props.activeTabKey === 'undefined') {
          throw 'TabList was not given an activeTabKey';
        } else {
          return this.props.tabKey === this.props.activeTabKey;
        }
      } else {
        return this.props.intID === this.props.activeID;
      }
    }
  }, {
    key: 'setActive',
    value: function setActive() {
      if (this.isUserControlled()) {
        if (!this.props.setActiveTabKey) {
          throw 'TabList was not given a setActiveTabKey function';
        } else {
          if (this.props.activeTabKey !== this.props.tabKey) {
            this.props.setActiveTabKey(this.props.tabKey);
            this.props.setActiveID(this.props.intID);
          }
        }
      } else {
        if (this.props.intID !== this.props.activeID) {
          this.props.setActiveID(this.props.intID);
        }
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      if (this.props.activeEvent === 'onClick' || this.props.activeEvent === 'both' || typeof this.props.activeEvent === 'undefined') {
        this.setActive();
      }
      event.persist();
      if (!event.target.className.includes('tab')) {
        event.stopPropagation();
      }
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver() {
      if (this.props.activeEvent === 'onMouseOver' || this.props.activeEvent === 'both') {
        this.setActive();
      }
    }
  }, {
    key: 'className',
    value: function className() {
      var className = 'tab important';
      className += this.isActive() ? ' active' : '';
      return className;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.isActive()) {
        this.setActive();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      newProps.tabKeyIDMap[newProps.tabKey] = newProps.intID;
      if (this.props.activeTabKey !== newProps.activeTabKey) {
        if (this.isActive()) {
          this.setActive();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var passedProps = this.deleteUsedProps(['children', 'setActiveID', 'intID', 'activeID', 'rippleComponents', 'activeEvent', 'activeTabKey', 'setActiveTabKey', 'tabKey', 'tabKeyIDMap']);
      this.props.style.boxSizing = 'border-box';
      passedProps = _extends({}, passedProps, {
        className: this.className(),
        ref: function ref(node) {
          return _this2.refNode = node;
        },
        onClick: this.onClick,
        onMouseOver: this.onMouseOver,
        style: this.props.style
      });
      return React.createElement(_Button.Button, _extends({}, passedProps, { children: this.props.children }));
    }
  }]);

  return Tab;
}(React.Component);

exports.Tab = Tab = (0, _Guac.Guac)(Tab);

exports.default = Tab;
exports.Tab = Tab;