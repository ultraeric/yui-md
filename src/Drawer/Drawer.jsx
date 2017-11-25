import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import provideSizeClass from '../utils/provideSizeClass';
import Overlay from '../Overlay';

/*
  NOTE: There should only be a single navigational drawer in your application.
  To render different information in your drawer, it is best to create several
  "pages" that the drawer can be given to render.

  Props:
  - active <boolean>: whether or not this drawer should be shown
  - s, m, l <boolean>: which sizeClass the window is in.
  - setActive(boolean) <function>: set the drawer as open or closed
  - onOverlayClickClose <boolean>: whether to close drawer on overlay click
  - temporary, persistent, permanent <boolean>: type of drawer
  - clipped <boolean>: Whether or not the app bar clips the drawer.
*/
class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.bindAllMethods();
    window.drawerRef = this;
    this.state = {
      drawerType: this.getDrawerType(props),
      active: true,
      appBarPadding: 0
    }
  }

  isActive() {
    if (typeof this.props.active !== 'undefined') {
      return this.props.active;
    } else {
      return this.state.active;
    }
  }

  getDrawerType(props) {
    let drawerType = props.temporary || props.persistent || props.permanent;
    if (drawerType ? props.temporary : props.s || props.m) {
      return 'temporary';
    } else if (drawerType ? props.persistent : false) {
      return 'persistent';
    } else if (drawerType ? props.permanent : props.l) {
      return 'permanent';
    }
    return null;
  }

  onClick(event) {
    if (this.props.onOverlayClickClose) {
      if (typeof this.props.active === 'undefined') { //Internally handled when this.props.active not passed
        this.setState({active: false});
      } else if (this.props.setActive) { //Externally happened when passed a function and visibility.
        this.props.setActive(false);
      }
    }
  }

  componentWillMount() {
    if (window.appBarRef) {
      window.appBarRef.pushDisplacement();
    }
    this.pushDisplacement();
  }

  pushDisplacement() {
    if (window.contentRef) {
      if (this.state.drawerType === 'temporary' ||
            (!this.props.visible &&
              this.state.drawerType !== 'permanent')) {
        window.contentRef.setDrawerPadding(0);
      } else {
        window.contentRef.setDrawerPadding(this.getWidth());
      }
    }
    if (window.appBarRef) {
      if (!this.props.clipped && (this.props.visible || this.state.drawerType === 'permanent')) {
        window.appBarRef.setDrawerPadding(this.getWidth());
      } else {
        window.appBarRef.setDrawerPadding(0);
      }
    }
  }

  /*
    Gets width, assuming active.
  */
  getWidth() {
    if (this.props.s) {
      return 280;
    } else {
      return 320;
    }
  }

  componentWillReceiveProps(newProps) {
    let newDrawerType = this.getDrawerType(newProps);
    setTimeout(this.pushDisplacement, 0);
    if (newDrawerType !== this.state.drawerType) {
      this.setState({drawerType: this.getDrawerType(newProps)});
    }
  }

  setAppBarPadding(padding) {
    if (padding !== this.state.appBarPadding) {
      this.setState({appBarPadding: padding});
    }
  }

  style() {
    let style = {};
    if (this.state.drawerType !== 'temporary' && this.props.clipped) {
      style = {marginTop: this.state.appBarPadding + 'px'};
    }
    return style;
  }

  overlayStyle() {
    let style = {};
    return style;
  }

  className() {
    let className = 'drawer z-depth-';
    if (this.state.drawerType === 'temporary' && this.props.active) {
      className += '8';
    } else {
      className += '1';
    }
    if (!this.props.active && this.state.drawerType !== 'permanent') {
      className += ' inactive';
    }
    if (this.props.s) {
      className += ' s';
    } else if (this.props.m) {
      className += ' m';
    } else if (this.props.l) {
      className += ' l';
    }
    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['active', 'onOverlayClick', 'children',
                                            'setActive', 's', 'm', 'l',
                                            'onOverlayClickClose']);
    passedProps = {
      ...passedProps,
      className: this.className(),
      style: this.style()
    }

    return (
      <Overlay active={this.state.drawerType === 'temporary' && this.props.active}
               onClick={this.onClick}
               ripple
               style={this.overlayStyle()}>
        <div style={{backgroundColor: 'transparent'}}>
          <div {...passedProps}>
          {this.props.children}
          </div>
        </div>
      </Overlay>
    );
  }
}

Drawer.defaultProps = {
  onOverlayClickClose: true
};

Drawer = provideSizeClass(Guac(Drawer));

export default Drawer;
export {Drawer};
