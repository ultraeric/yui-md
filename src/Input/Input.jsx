import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';

/*
  Props:
  - label <string>: label
  - value <string>: value of input
  - changeValue <function<string>>: function that changes value
*/

class Input extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  onChange(event) {
    this.props.changeValue(event.target.value);
  }

  render() {
    let passedProps = this.deleteUsedProps([]);
    passedProps = {
      ...passedProps
    };

    return (
      <div>
        <input type='text' onChange={this.onChange} {...passedProps}/>
        <label className='text-input-label'>{this.props.label}</label>
      </div>
    );
  }
}

/*
  Props:
  - label <string>
  - options <object>
  - selected <string>: key of the selected option
  - setSelected <function<key>>: function that changes which key is selected
*/
class Dropdown extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  getOptionComponents(options, selected) {
    var optionComponents = [];
    for (var key in options) {
      optionComponents.push(
        <option key={key} value={key}>{options[key]}</option>
      );
    }
    return optionComponents
  }

  onChange(event) {
    this.props.setSelected(event.target.value);
  }

  render() {
    console.log(this.props.selected);
    let passedProps = this.deleteUsedProps([]);
    passedProps = {
      ...passedProps
    };
    return (
      <div>
        <div style={{height: '12px'}}/>
        <label className='text-input-label'>{this.props.label}</label>
        <select name='dropdown' value={this.props.selected} onChange={this.onChange}>
          {this.getOptionComponents(this.props.options, this.props.selected)}
        </select>
      </div>
    );
  }
}

Input = Guac(Input);
Dropdown = Guac(Dropdown);

export default Input;
export {Input, Dropdown};
