'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideWindowSize = exports.provideSizeClass = exports.applyRipple = undefined;

var _applyRipple = require('./applyRipple');

var _provideSizeClass = require('./provideSizeClass');

var _provideWindowSize = require('./provideWindowSize');

var utils = { applyRipple: _applyRipple.applyRipple, provideSizeClass: _provideSizeClass.provideSizeClass, provideWindowSize: _provideWindowSize.provideWindowSize };

exports.default = utils;
exports.applyRipple = _applyRipple.applyRipple;
exports.provideSizeClass = _provideSizeClass.provideSizeClass;
exports.provideWindowSize = _provideWindowSize.provideWindowSize;