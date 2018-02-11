import * as React from 'react';
import Hoc from 'guac-hoc/lib/Hoc';

let windowSize = {width: 0, height: 0};
let componentsToUpdate = new Set(); //add components here so the window knows which components to force update on
let componentsToRemove = new Set();
let lastUpdate = new Date();
let updateDelay = 500; //in milliseconds

let push = function pushWindowSizeToComponents(fromActiveCallback) {
  if (!fromActiveCallback && window.waitingWindowSizer) {return;}

  window.waitingWindowSizer = true;
  let newTime = new Date();
  if (newTime - lastUpdate >= updateDelay) {
    //Removes any components that need to be removed
    for (var item in componentsToRemove) {
      componentsToUpdate.delete(item);
    }
    windowSize = {width: window.innerWidth, height: window.innerHeight};
    //Forces the update
    for (var item of componentsToUpdate) {
      //Closure to keep reference to item.
      item.updateWindowSize(windowSize);
    }
    window.waitingWindowSizer = false;
  } else {
    setTimeout(() => push(true), updateDelay);
  }
  lastUpdate = newTime;
}

window.forceComponentsToUpdate = ((componentsToUpdate) => function() {
  for (var item of componentsToUpdate) {
    item.forceUpdate();
  }
})(componentsToUpdate);

//Initializes the window size on window load.
window.addEventListener('load', push);

//Adds an event to window on resize that updates all components wrapped in provideWindowSize
window.addEventListener('resize', () => setTimeout(push, 0));

//HOC function that provides windowSize prop to child. {width, height}. This is in CSS px
function provideWindowSize(WrappedComponent) {
  class WindowSizeWrapped extends React.Component {
    constructor() {
      super();

      this.bindAllMethods();

      //Keeps the state which is updated for rendering later. Initialized to the
      //window size.
      windowSize = {width: window.innerWidth, height: window.innerHeight};
      this.state = {windowSize: windowSize};
    }

    //On mount, adds this component to the set of components to track
    componentWillMount() {
      if (!window.isServer) {
        componentsToUpdate.add(this);
      }
    }

    //On unmount, queues this component for removal during next update
    componentWillUnmount() {
      componentsToRemove.add(this);
    }

    //Updates the window size state, forces render
    updateWindowSize(windowSize) {
      this.setState({
        windowSize: windowSize
      });
    }

    //Renders component in HOC context
    render() {
      return <WrappedComponent {...this.props} windowSize={this.state.windowSize}/>
    }
  }
  WindowSizeWrapped = Hoc(WindowSizeWrapped);
  return WindowSizeWrapped;
}

export default provideWindowSize;
export {provideWindowSize};
