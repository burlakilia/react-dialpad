import React, { Component } from 'react';

import CallEnd from './call-end/Index';
import Transfer from './transfer/Index';

// import Speaker from './speaker';
// import Camera from './camera';
// import Microphone from './microphone';
// import Keypad from './keypad';

import STATES from '../../../../../util/states';

class Action extends Component {
  constructor() {
    super();
    this.onCallEndPressed = this.onCallEndPressed.bind(this);
    this.onTransferPressed = this.onTransferPressed.bind(this);
  }

  onCallEndPressed() {
    const { onCallEndPressed } = this.props;

    if (onCallEndPressed) {
      onCallEndPressed();
    }
  }

  onTransferPressed() {
    const { onTransferPressed } = this.props;

    if (onTransferPressed) {
      onTransferPressed();
    }
  }

  render() {
    const { state } = this.props;

    let buttons = <div className="buttons">
      <div className="button-spacer">
      </div>
      <CallEnd
        onPressed={this.onCallEndPressed}
        callState={state}
        enablerStates={[STATES.CALLING, STATES.RINGING, STATES.ON_CALL]}
      />
      <Transfer
        onPressed={this.onTransferPressed}
        callState={state}
        enablerStates={[STATES.ON_CALL]}
      />
      {/* <Camera />
			<Microphone />
			<Speaker />
			<Keypad /> */}
    </div>;

    return buttons;
  }
}

export default Action;
