import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - label <string>: label
  - value <string>: value of input
*/

class Input extends React.Component {
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
      <div>
        <div style={{height: '12px'}}/>
        <label className='text-input-label'>{this.props.label}</label>
        <input type='text' {...passedProps}>
          {this.props.value}
        </input>
      </div>
    );
  }
}

Input = Guac(Input);

export default Input;
export {Input};
