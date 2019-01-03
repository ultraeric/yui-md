'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _utils = require('guac-hoc/lib/utils');

var _utils2 = _interopRequireDefault(_utils);

var _provideSizeClass = require('../utils/provideSizeClass');

var _provideSizeClass2 = _interopRequireDefault(_provideSizeClass);

var _Guac = require('guac-hoc/lib/Guac');

var _Guac2 = _interopRequireDefault(_Guac);

var _StickyFooter = require('../StickyFooter');

var _StickyFooter2 = _interopRequireDefault(_StickyFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*  Props:
*  - noPadding <boolean>: unpadded content body.
*  - footerComponent <Component>
**/
var Content = function (_React$PureComponent) {
  _inherits(Content, _React$PureComponent);

  function Content() {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this));

    _this.bindAllMethods();
    _this.state = {
      appBarPadding: 0,
      heightOffset: 0,
      drawerPadding: 0
    };
    window.contentRef = _this;
    return _this;
  }

  _createClass(Content, [{
    key: 'style',
    value: function style() {
      var style = { paddingTop: this.state.appBarPadding + 'px',
        paddingLeft: this.state.drawerPadding
      };
      return style;
    }
  }, {
    key: 'className',
    value: function className() {
      var className = 'content';
      className += this.props.s ? ' s' : '';
      className += this.props.m ? ' m' : '';
      className += this.props.l ? ' l' : '';

      return className;
    }
  }, {
    key: 'contentContainerClassName',
    value: function contentContainerClassName() {
      var className = 'content-container';
      className += this.props.noPadding ? ' no-padding' : '';
      return className;
    }
  }, {
    key: 'setAppBarPadding',
    value: function setAppBarPadding(padding, heightOffset) {
      var newState = {};
      if (padding !== this.state.appBarPadding && typeof padding === 'number') {
        newState.appBarPadding = padding;
      }
      if (heightOffset !== this.state.heightOffset && typeof heightOffset === 'number') {
        newState.heightOffset = heightOffset;
      }
      this.setState(newState);
    }
  }, {
    key: 'setDrawerPadding',
    value: function setDrawerPadding(padding) {
      if (padding !== this.state.drawerPadding && typeof padding === 'number') {
        this.setState({ drawerPadding: padding });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (window.appBarRef) {
        window.appBarRef.pushDisplacement();
      }
      if (window.drawerRef) {
        window.drawerRef.pushDisplacement();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (window.appBarRef) {
        setTimeout(window.appBarRef.pushDisplacement, 0);
      }
      if (window.drawerRef) {
        setTimeout(window.drawerRef.pushDisplacement, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var passedProps = this.deleteUsedProps(['s', 'm', 'l', 'children', 'footerComponent']);
      passedProps = _extends({}, passedProps, {
        className: this.className(),
        style: this.style()
      });

      var children = React.Children.toArray(this.props.children);
      var footerComponent = null;
      for (var index in children) {
        var childElement = children[index];
        if (childElement.type === _StickyFooter2.default) {
          footerComponent = children.splice(index, 1);
        }
      }

      footerComponent = footerComponent || this.props.footerComponent || null;

      return React.createElement(
        'div',
        passedProps,
        React.createElement(
          'div',
          { className: this.contentContainerClassName() },
          children
        ),
        footerComponent
      );
    }
  }]);

  return Content;
}(React.PureComponent);

exports.Content = Content = (0, _provideSizeClass2.default)((0, _Guac2.default)(Content));

exports.default = Content;
exports.Content = Content;