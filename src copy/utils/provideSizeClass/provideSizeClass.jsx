import * as React from 'react';
import Hoc from 'guac-hoc/lib/Hoc';
import provideWindowSize from '../provideWindowSize';

//HOC function that provides screenType prop 'l', 'm', or 's' to child
function provideSizeClass(WrappedComponent) {

  class SizeClassWrapped extends React.Component {
    constructor(props) {
      super(props);
      this.bindAllMethods();

      this.state = {
        sizeClass: this.getSizeClass(props.windowSize)
      };
    }

    //Gets the size class based on common cutoffs (980, 480 px)
    getSizeClass(size) {
      // size = (size.width < size.height) ? size : {width: size.height, height: size.width};
      if (!size.width || !size.height) {
        return 'noClassSize';
      }
      if (size.width >= 980) {
        return 'l';
      } else if (size.width >= 480) {
        return 'm';
      } else if (size.width < 480){
        return 's';
      }
    }

    //On a prop update, update size class
    componentWillReceiveProps(newProps) {
      this.setState({
        sizeClass: this.getSizeClass(newProps.windowSize)
      });
    }

    //Renders component in HOC context
    render() {
      let passProps = this.deleteUsedProps(['windowSize']);
      passProps[this.state.sizeClass] = true;

      this.deleteUsedProps(['windowSize']);

      return <WrappedComponent {...passProps}/>
    }
  }
  SizeClassWrapped = Hoc(SizeClassWrapped);

  //Returns HOC with window size provided
  return provideWindowSize(SizeClassWrapped);
}

export default provideSizeClass;
export {provideSizeClass};
