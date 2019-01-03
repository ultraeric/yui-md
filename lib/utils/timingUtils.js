"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getScalingFunc(base, factor) {
  return function (numToScale) {
    return factor * numToScale + base;
  };
}

function getAnimationTimeBySize(s) {
  return 0.25 + s / 1960;
}

exports.getScalingFunc = getScalingFunc;
exports.getAnimationTimeBySize = getAnimationTimeBySize;