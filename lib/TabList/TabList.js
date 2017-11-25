'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _provideWindowSize = require('../utils/provideWindowSize');

var _provideWindowSize2 = _interopRequireDefault(_provideWindowSize);

var _Tab = require('../Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tabListID = 0;

/*
  Props:
  - activeEvent <string>: 'onMouseOver' or 'onClick' or 'both'
  - activeTabKey <string/int>: the current active tab
  - setActiveTabKey(<string/int>): function to call when tab set to active
*/

var TabList = function (_React$PureComponent) {
  _inherits(TabList, _React$PureComponent);

  function TabList() {
    _classCallCheck(this, TabList);

    var _this = _possibleConstructorReturn(this, (TabList.__proto__ || Object.getPrototypeOf(TabList)).call(this));

    _this.bindAllMethods();
    _this.tabListID = tabListID;
    tabListID++;
    _this.state = {
      activeID: 0
    };
    _this.tabKeyIDMap = {};
    return _this;
  }

  _createClass(TabList, [{
    key: 'isUserControlled',
    value: function isUserControlled() {
      return typeof this.props.activeTabKey !== 'undefined' && typeof this.props.setActiveTabKey !== 'undefined';
    }
  }, {
    key: 'setActiveID',
    value: function setActiveID(id) {
      this.setState({ activeID: id });
    }
  }, {
    key: 'className',
    value: function className() {
      var className = 'tab-list';
      return className;
    }
  }, {
    key: 'calcActiveBox',
    value: function calcActiveBox(numShownTabs) {
      if (!this.domNode) return;
      var width = this.domNode.clientWidth / numShownTabs;
      var activeID = this.isUserControlled() ? this.tabKeyIDMap[this.props.activeTabKey] : this.state.activeID;
      var style = {
        top: this.domNode.offsetTop + this.domNode.offsetHeight - 3 + 'px',
        left: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ' * ' + activeID + ')',
        width: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ')'
      };
      return style;
    }
  }, {
    key: 'calcTabWidthRatio',
    value: function calcTabWidthRatio(numShownTabs) {
      return '100% / ' + numShownTabs;
    }
  }, {
    key: 'calcActiveBoxClassName',
    value: function calcActiveBoxClassName() {
      var className = 'indicator';
      return className;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = React.Children.toArray(this.props.children);
      var numShownTabs = children.length;
      var newChildren = [];
      //Re-render children to add props
      for (var i = 0; i < children.length; i++) {
        var newChild;
        if (children[i].type === _Tab2.default) {
          newChild = React.cloneElement(children[i], { intID: i,
            activeID: this.state.activeID,
            setActiveID: this.setActiveID,
            style: { width: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ')' },
            activeEvent: this.props.activeEvent,
            activeTabKey: this.props.activeTabKey,
            setActiveTabKey: this.props.setActiveTabKey,
            tabKeyIDMap: this.tabKeyIDMap
          });
        } else {
          newChild = children[i];
        }
        newChildren.push(newChild);
      }

      var passedProps = this.deleteUsedProps(['activeEvent', 'activeTabKey', 'setActiveTabKey']);
      passedProps = _extends({}, passedProps, {
        className: this.className(),
        id: this.tabListID
      });

      return React.createElement(
        'div',
        passedProps,
        React.createElement(
          'div',
          { className: 'nostyle-container', ref: function ref(node) {
              return _this2.domNode = ReactDOM.findDOMNode(node);
            } },
          newChildren,
          React.createElement('span', { className: this.calcActiveBoxClassName(), style: this.calcActiveBox(numShownTabs) })
        )
      );
    }
  }]);

  return TabList;
}(React.PureComponent);

TabList.defaultProps = {
  activeEvent: 'onClick'
};

exports.TabList = TabList = (0, _Guac2.default)(TabList);

exports.default = TabList;
exports.TabList = TabList;