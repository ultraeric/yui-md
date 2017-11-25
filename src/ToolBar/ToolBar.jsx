import * as React from 'react';
import {Guac} from 'guac-hoc/lib/Guac';

class ToolBar extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  render() {
    return (
      <div/>
    );
  }
}

ToolBar = Guac(ToolBar);

export default ToolBar;
export {ToolBar};
