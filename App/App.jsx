import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Guac from 'guac-hoc/lib/Guac';

import {Button, IconButton, FloatingActionButton} from '../lib/Button';
import Drawer from '../lib/Drawer';
import Content from '../lib/Content';
import Card from '../lib/Card';
import Icon from '../lib/Icon';
import TabList from '../lib/TabList';
import Tab from '../lib/Tab';
import Menu from '../lib/Menu';
import MenuItem from '../lib/MenuItem';
import Divider from '../lib/Divider';
import AppBar from '../lib/AppBar';
import Snackbar from '../lib/Snackbar';
import {Row, Col, StickyFooter} from '../lib';

class App extends React.Component {
  constructor() {

    super();
    this.bindAllMethods();
    this.state = {
      drawerActive: false,
      menuActive: false,
      activeTabKey: 1
    };
  }

  setDrawerActive(isOpen) {
    this.setState({drawerActive: isOpen});
  }

  toggleDrawer() {
    this.setState({drawerActive: !this.state.drawerActive});
  }

  setMenuActive(isOpen) {
    this.setState({menuActive: isOpen});
  }

  setActiveKey(key) {
    this.setState({activeTabKey: key});
  }

  render() {
    return (
        <div className={'app-root'}>
          <AppBar></AppBar>
          <Content>
            <Button onClick={this.toggleDrawer}>Color 1</Button>
            <Button label={'Color 2'} icon={'alarm'}></Button>
            <IconButton icon={'alarm'}/>
            <FloatingActionButton icon={'alarm'}/>
              <TabList style={{width: '50%'}} setActiveTabKey={this.setActiveKey}>
                <Tab tabKey={1}>Test1</Tab>
                <Tab tabKey={2}
                      onMouseEnter={() => {this.setMenuActive(true);}}
                      onMouseLeave={(event) => {console.log('hi'); this.setMenuActive(false); }}>
                  Test2
                  <Menu active={this.state.menuActive}
                        setActive={this.setMenuActive}
                        expand={'vertical'}
                        fastExpand>
                    <MenuItem>
                      Hi
                    </MenuItem>
                    <MenuItem>
                      Second Menu Item
                    </MenuItem>
                  </Menu>
                </Tab>
                <Tab tabKey={3}>Test3</Tab>
              </TabList>
              <Row>
                <Col sm={6}>Hi</Col>
                <Col sm={6}>Hi2</Col>
                <Col sm={6}>Hi3</Col>
                <Col sm={6}>LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT LONG TEXT </Col>
              </Row>
              <StickyFooter raised>Hello Sticky Footer!</StickyFooter>
          </Content>
          <Drawer active={this.state.drawerActive}
                  setActive={this.setDrawerActive}/>
          <Snackbar/>
        </div>
    );
  }
}

App = Guac(App);

ReactDOM.render(<App/>,
            document.getElementById('app'));
