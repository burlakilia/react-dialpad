import React, { Component } from 'react';
import Name from './name/Index';
import Number from './number/Index';

class Contact extends Component {
  constructor() {
    super();
  }

  render() {
    const { contact = {} } = this.props;
    const { name, number } = contact;

    return (
      <div className="contact">
        <Name name={name}/>
        <Number number={number} />
      </div>
    );
  }
}

export default Contact;
