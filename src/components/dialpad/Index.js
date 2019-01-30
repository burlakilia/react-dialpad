import React, { Component } from 'react';

import CallView from './views/call-view/Index';
import InitialView from './views/initial-view/Index';
import IncomingCallView from './views/incoming-call-view/Index';

import { CLASS_PREFIX } from '../../util/constants';
import STATES from '../../util/states';
import ACTIONS from '../../util/actions';

class ReactDialpad extends Component {
  constructor(props) {
    super();
    this.state = {
      state: props.state || STATES.DEFAULT,
      timer: null,
      startTime: null,
      contact: props.contact || {},
      noStateErrors: props.noStateErrors || false
    };

    this.onCallPressed = this.onCallPressed.bind(this);
    this.onCallEndPressed = this.onCallEndPressed.bind(this);
    this.onCallReplyPressed = this.onCallReplyPressed.bind(this);
    this.onCallRejectPressed = this.onCallRejectPressed.bind(this);
    this.onNotesChanged = this.onNotesChanged.bind(this);
    this.onTransferPressed = this.onTransferPressed.bind(this);

    this.setRinging = this.setRinging.bind(this);
    this.setOnCall = this.setOnCall.bind(this);
    this.setIncomingCall = this.setIncomingCall.bind(this);
    this.endCall = this.endCall.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onStateChanged } = this.props;

    if (prevProps.state !== this.props.state || prevState.state !== this.props.state) {
      console.log('!!!', this.props.state);
      this.setState({ state: this.props.state });
      if (onStateChanged) {
        onStateChanged(this.state.state);
      }
    }
  }

  onCallPressed(number) {
    const { onActionInvoked } = this.props;

    this.setState({
      state: STATES.CALLING,
      contact: {
        avatar: null,
        name: number, // TODO: Replaced with the real contact name in provided addressbook
        number: number
      }
    });

    if (onActionInvoked) {
      onActionInvoked(ACTIONS.CALL_STARTED, { number });
    }
  }

  onNotesChanged(value) {
    this.setState({ notes: value })
  }

  onCallEndPressed() {
    const { onActionInvoked } = this.props;

    this.setState({
      state: STATES.ENDING
    });

    if (onActionInvoked) {
      onActionInvoked(ACTIONS.CALL_ENDED);
    }
  }

  onCallReplyPressed() {
    const { onActionInvoked } = this.props;

    this.setState({
      state: STATES.REPLYING
    });

    if (onActionInvoked) {
      onActionInvoked(ACTIONS.CALL_REPLIED);
    }
  }

  onTransferPressed() {
    const { onTransferPressed } = this.props;

    if (onTransferPressed) {
      onTransferPressed();
    }

  }

  isState(state) {
    return this.state.noStateErrors && state === this.state.state;
  }

  onCallRejectPressed() {
    const { onActionInvoked } = this.props;

    this.setState({
      state: STATES.REJECTING
    });

    if (onActionInvoked) {
      onActionInvoked(ACTIONS.CALL_REJECTED);
    }
  }

  setOnCall() {
    this.setState({
      state: STATES.ON_CALL,
      startTime: Date.now()
    });

    this.timer = setInterval(() => {
      this.setState({
        timer: Math.floor((Date.now() - this.state.startTime) / 1000)
      });
    }, 1000);
  }

  setRinging() {
    this.setState({
      state: STATES.RINGING
    });
  }

  setIncomingCall(contact) {
    this.setState({
      contact,
      state: STATES.INCOMING_CALL
    });
  }

  endCall() {
    const { notes } = this.state;

    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({
      state: STATES.DEFAULT,
      startTime: null,
      timer: null,
      contact: {},
      notes: ''
    });

    return notes;
  }

  setContact(contact) {
    this.setState({ contact });
  }

  render() {
    const { style } = this.props;
    let view;

    if (this.state.state === STATES.HIDDEN) {
      return (<div hidden={true}></div>);
    } else if (this.state.state === STATES.DEFAULT) {
      view = <InitialView
        onCallPressed={this.onCallPressed}
      />;
    } else if (this.state.state === STATES.INCOMING_CALL ||
					this.state.state === STATES.REPLYING ||
					this.state.state === STATES.REJECTING) {
      view = <IncomingCallView
        contact={this.state.contact}
        state={this.state.state}
        onCallRejectPressed={this.onCallRejectPressed}
        onCallReplyPressed={this.onCallReplyPressed}
      />;
    } else {
      view = <CallView
        contact={this.state.contact}
        state={this.state.state}
        timer={this.state.timer}
        onCallEndPressed={this.onCallEndPressed}
        onNotesChanged={this.onNotesChanged}
        onTransferPressed={this.onTransferPressed}
      />;
    }

    return (
      <div className={`${CLASS_PREFIX}-root`} style={style}>
        {view}
      </div >
    );
  }
}

export default ReactDialpad;
