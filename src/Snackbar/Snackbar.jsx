import * as React from 'react';
import Guac from 'guac-hoc/lib/Guac';
import Button from '../Button';

let defaultDuration = 5000;
let consecutiveDuration = 3000;
let snackQueue = [];
let currentTimeoutFunc = null;
let isQueuing = false;

window.triggerSnackbar = function (message, actionMessage, action, duration=defaultDuration) {
  window.snackbar.triggerSnackbar(message, actionMessage, action, duration);
};

/*
*/
class Snackbar extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      active: false,
      message: null,
      actionMessage: null,
      action: null
    };
  }

  componentWillMount() {
    window.snackbar = this;
  }

  triggerSnackbar(message, actionMessage, action, duration) {
    duration = duration || defaultDuration;
    snackQueue.push({message, actionMessage, action, duration});
    if (!currentTimeoutFunc || !isQueuing) {
      this.updateSnackbar();
    }
  }

  updateSnackbar() {
    let scheduleSnackEvents = (snack) => {
      setTimeout(() => this.setState({active: true,
                                      message: snack.message,
                                      actionMessage: snack.actionMessage,
                                      action: snack.action
                                    }), 0);
      setTimeout(this.updateSnackbar, consecutiveDuration);
      currentTimeoutFunc = setTimeout(() => {
                                        resetSnackbar();
                                      }, snack.duration);
    };

    let resetSnackbar = () => {
      clearTimeout(currentTimeoutFunc);
      setTimeout(() => this.setState({active: false}), 0);
      currentTimeoutFunc = setTimeout(() => {
                              currentTimeoutFunc = null;
                              this.updateSnackbar();
                            }, 600);
    };

    //If a snackbar needs to be shown
    if (snackQueue.length > 0) {
      isQueuing = true;
      //Check if a current snackbar is being shown
      if (currentTimeoutFunc) {
        //If so, reset it.
        resetSnackbar();
      } else {
        //If not, get the first snack in the queue and schedule its events.
        let snack = snackQueue[0];
        snackQueue = snackQueue.slice(1, snackQueue.length);
        scheduleSnackEvents(snack);
      }
    } else {
      isQueuing = false;
    }
  }

  className() {
    let className = 'snackbar';
    className += this.state.active ? ' active' : '';

    return className;
  }

  render() {
    let passedProps = this.deleteUsedProps(['active']);
    let action = this.state.action || (() => null);
    return (
      <div {...passedProps} className={this.className()}>
        {this.state.message}
        <Button className={'snackbar-button'} onClick={action}>
          {this.state.actionMessage}
        </Button>
      </div>
    );
  }
}

Snackbar = Guac(Snackbar);

export default Snackbar;
export {Snackbar};
