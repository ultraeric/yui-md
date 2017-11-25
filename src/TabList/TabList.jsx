import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import provideWindowSize from '../utils/provideWindowSize';
import Tab from '../Tab';

let tabListID = 0;

/*
  Props:
  - activeEvent <string>: 'onMouseOver' or 'onClick' or 'both'
  - activeTabKey <string/int>: the current active tab
  - setActiveTabKey(<string/int>): function to call when tab set to active
*/
class TabList extends React.PureComponent {
  constructor() {
    super();
    this.bindAllMethods();
    this.tabListID = tabListID;
    tabListID++;
    this.state = {
      activeID: 0
    };
    this.tabKeyIDMap = {};
  }

  isUserControlled() {
    return (typeof(this.props.activeTabKey) !== 'undefined')
          && (typeof(this.props.setActiveTabKey) !== 'undefined');
  }

  setActiveID(id) {
    this.setState({activeID: id});
  }

  className() {
    let className = 'tab-list';
    return className;
  }

  calcActiveBox(numShownTabs) {
    if (!this.domNode) return;
    let width = this.domNode.clientWidth / numShownTabs;
    let activeID = this.isUserControlled() ? this.tabKeyIDMap[this.props.activeTabKey] : this.state.activeID;
    let style = {
      top: this.domNode.offsetTop + this.domNode.offsetHeight - 3 + 'px',
      left: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ' * ' + activeID + ')',
      width: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ')'
    }
    return style;
  }

  calcTabWidthRatio(numShownTabs) {
    return '100% / ' + numShownTabs;
  }

  calcActiveBoxClassName() {
    let className = 'indicator';
    return className;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    let children = React.Children.toArray(this.props.children);
    let numShownTabs = children.length;
    let newChildren = [];
    //Re-render children to add props
    for (let i = 0; i < children.length; i++) {
      var newChild;
      if (children[i].type === Tab) {
        newChild = React.cloneElement(children[i], {intID: i,
                                                      activeID: this.state.activeID,
                                                      setActiveID: this.setActiveID,
                                                      style: {width: 'calc(' + this.calcTabWidthRatio(numShownTabs) + ')'},
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

    let passedProps = this.deleteUsedProps(['activeEvent', 'activeTabKey', 'setActiveTabKey']);
    passedProps = {
      ...passedProps,
      className: this.className(),
      id: this.tabListID
    };

    return (
      <div {...passedProps}>
        <div className={'nostyle-container'} ref={(node) => this.domNode = ReactDOM.findDOMNode(node)}>
          {newChildren}
          <span className={this.calcActiveBoxClassName()} style={this.calcActiveBox(numShownTabs)}/>
        </div>
      </div>
    );
  }
}

TabList.defaultProps = {
  activeEvent: 'onClick'
}

TabList = Guac(TabList);

export default TabList;
export {TabList};
