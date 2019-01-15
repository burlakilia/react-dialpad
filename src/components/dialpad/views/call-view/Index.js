import React, { Component } from 'react';

import Contact from './contact/Index';
import Status from './status/Index';
import Timer from './timer/Index';
import Action from './action/Index';
import { EditableText } from '@blueprintjs/core';

import STATES from '../../../../util/states';

class CallView extends Component {
  constructor() {
    super();
    this.onCallEndPressed = this.onCallEndPressed.bind(this);
    this.onCallRejectPressed = this.onCallRejectPressed.bind(this);
    this.onCallReplyPressed = this.onCallReplyPressed.bind(this);
    this.onNotesChanged = this.onNotesChanged.bind(this);
    this.onTransferPressed = this.onTransferPressed.bind(this);
  }

  onCallEndPressed() {
    const { onCallEndPressed } = this.props;

    if (onCallEndPressed) {
      onCallEndPressed();
    }
  }

  onCallRejectPressed() {
    const { onCallRejectPressed } = this.props;

    if (onCallRejectPressed) {
      onCallRejectPressed();
    }
  }

  onTransferPressed() {
    const { onTransferPressed } = this.props;

    if (onTransferPressed) {
      onTransferPressed();
    }
  }

  onNotesChanged(value) {
    const { onNotesChanged } = this.props;

    if (onNotesChanged) {
      onNotesChanged(value);
    }
  }

  onCallReplyPressed() {
    const { onCallReplyPressed } = this.props;

    if (onCallReplyPressed) {
      onCallReplyPressed();
    }
  }

  render() {
    const { style, contact, state, timer } = this.props;
    let statusOrTimer;
    let action;

    if (!timer) {
      statusOrTimer = <Status state={state} />;
    } else {
      statusOrTimer = <Timer timer={timer} />;
    }

    if (state === STATES.INCOMING_CALL) {
      action = <Action
        state={state}
        onCallRejectPressed={this.onCallRejectPressed}
        onCallReplyPressed={this.onCallReplyPressed}
      />;
    } else {
      action = <Action
        state={state}
        onCallEndPressed={this.onCallEndPressed}
        onTransferPressed={this.onTransferPressed}
      />;
    }

    return (
      <div className='call-view' style={style}>
        <EditableText
          multiline={true}
          minLines={3} maxLines={6}
          placeholde="Заметки"
          onChange={this.onNotesChanged}/>
        <Contact contact={contact} ref={contact => { this.contact = contact } }/>
        {statusOrTimer}
        {action}
      </div >
    );
  }
}

export default CallView;
