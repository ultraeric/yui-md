import * as React from 'react';
import utils from 'guac-hoc/lib/utils';
import provideSizeClass from '../utils/provideSizeClass';
import Guac from 'guac-hoc/lib/Guac';
import StickyFooter from '../StickyFooter';

/**
*  Props:
*  - noPadding <boolean>: unpadded content body.
*  - footerComponent <Component>
**/
class Content extends React.PureComponent {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      appBarPadding: 0,
      heightOffset: 0,
      drawerPadding: 0
    }
    window.contentRef = this;
  }

  style() {
    let style = {paddingTop: this.state.appBarPadding + 'px',
                  paddingLeft: this.state.drawerPadding,
                };
    return style;
  }

  className() {
    let className = 'content';
    className += this.props.s ? ' s' : '';
    className += this.props.m ? ' m' : '';
    className += this.props.l ? ' l' : '';

    return className;
  }

  contentContainerClassName() {
    let className = 'content-container';
    className += this.props.noPadding ? ' no-padding' : '';
    return className;
  }

  setAppBarPadding(padding, heightOffset) {
    let newState = {};
    if (padding !== this.state.appBarPadding && typeof(padding) === 'number') {
      newState.appBarPadding = padding;
    }
    if (heightOffset !== this.state.heightOffset && typeof(heightOffset) === 'number') {
      newState.heightOffset = heightOffset;
    }
    this.setState(newState);
  }

  setDrawerPadding(padding) {
    if (padding !== this.state.drawerPadding && typeof(padding) === 'number') {
      this.setState({drawerPadding: padding});
    }
  }

  componentWillMount() {
    if (window.appBarRef) {
      window.appBarRef.pushDisplacement();
    }
    if (window.drawerRef) {
      window.drawerRef.pushDisplacement();
    }
  }

  componentWillReceiveProps() {
    if (window.appBarRef) {
      setTimeout(window.appBarRef.pushDisplacement, 0);
    }
    if (window.drawerRef) {
      setTimeout(window.drawerRef.pushDisplacement, 0);
    }
  }

  render() {
    let passedProps = this.deleteUsedProps(['s', 'm', 'l', 'children', 'footerComponent']);
    passedProps = {
      ...passedProps,
      className: this.className(),
      style: this.style()
    };

    let children = React.Children.toArray(this.props.children);
    let footerComponent = null;
    for (var index in children) {
      let childElement = children[index];
      if (childElement.type === StickyFooter) {
        footerComponent = children.splice(index, 1);
      }
    }

    footerComponent = footerComponent || this.props.footerComponent || null;

    return (
      <div {...passedProps}>
        <div className={this.contentContainerClassName()}>
          {children}
        </div>
        {footerComponent}
      </div>
    );
  }
}

Content = provideSizeClass(Guac(Content));

export default Content;
export {Content};
