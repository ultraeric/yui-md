import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Guac} from 'guac-hoc/lib/Guac';
import {applyRipple} from '../utils/applyRipple';
import {Button} from '../Button';

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
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.bindAllMethods();
    this.state = {
      active: this.isActive()
    };
    props.tabKeyIDMap[props.tabKey] = props.intID;
  }

  isUserControlled() {
    return (typeof(this.props.tabKey) !== 'undefined')
          && (typeof(this.props.setActiveTabKey) !== 'undefined')
          && (typeof(this.props.activeTabKey) !== 'undefined');
  }

  isActive() {
    if (this.isUserControlled()) {
      if (typeof(this.props.activeTabKey) === 'undefined') {
        throw 'TabList was not given an activeTabKey';
      } else {
        return this.props.tabKey === this.props.activeTabKey;
      }
    } else {
      return this.props.intID === this.props.activeID;
    }
  }

  setActive() {
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

  onClick(event) {
    if (this.props.activeEvent === 'onClick' ||
        this.props.activeEvent === 'both' ||
        typeof(this.props.activeEvent) === 'undefined') {
      this.setActive();
    }
    event.persist();
    if (!event.target.className.includes('tab')) {
      event.stopPropagation();
    }
  }

  onMouseOver() {
    if (this.props.activeEvent === 'onMouseOver' ||
        this.props.activeEvent === 'both') {
      this.setActive();
    }
  }

  className() {
    let className = 'tab important';
    className += this.isActive() ? ' active' : '';
    return className;
  }

  componentDidMount() {
    if (this.isActive()) {
      this.setActive();
    }
  }

  componentWillReceiveProps(newProps) {
    newProps.tabKeyIDMap[newProps.tabKey] = newProps.intID;
    if (this.props.activeTabKey !== newProps.activeTabKey) {
      if (this.isActive()) {
        this.setActive();
      }
    }
  }

  render() {
    let passedProps = this.deleteUsedProps(['children', 'setActiveID', 'intID', 'activeID',
                                            'rippleComponents', 'activeEvent', 'activeTabKey',
                                            'setActiveTabKey', 'tabKey', 'tabKeyIDMap']);
    this.props.style.boxSizing = 'border-box'
    passedProps = {
      ...passedProps,
      className: this.className(),
      ref: (node) => this.refNode = node,
      onClick: this.onClick,
      onMouseOver: this.onMouseOver,
      style: this.props.style
    };
    return (
      <Button {...passedProps} children={this.props.children}>
      </Button>
    );
  }
}

Tab = Guac(Tab);

export default Tab;
export {Tab};
