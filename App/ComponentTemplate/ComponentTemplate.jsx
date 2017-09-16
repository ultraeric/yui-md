import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';

class ComponentTemplate extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  render() {
    let passedProps = this.deleteUsedProps([]);
    passedProps = {
      ...passedProps
    };
    return (
      <div {...passedProps}>
        {this.props.children}
      </div>
    );
  }
}

ComponentTemplate = Guac(ComponentTemplate);

export default ComponentTemplate;
export {ComponentTemplate};
