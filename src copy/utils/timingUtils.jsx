function getScalingFunc(base, factor){
  return function(numToScale) {
    return factor * numToScale + base;
  }
}

function getAnimationTimeBySize(s) {
  return (0.3 + s / 1960);
}

export {getScalingFunc, getAnimationTimeBySize};
