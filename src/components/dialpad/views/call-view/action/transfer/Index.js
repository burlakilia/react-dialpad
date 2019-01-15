import React, { Component } from 'react';
import Button from '../../../../_shared/button/Index';

class Transfer extends Component {
  constructor() {
    super();
    this.onPressed = this.onPressed.bind(this);
  }

  onPressed() {
    const { onPressed } = this.props;

    onPressed();
  }

  render() {
    const { ...otherProps } = this.props;

    return (
      <Button def="Call End" className="button transfer"  onClick={this.onPressed} {...otherProps} />
    );
  }
}

export default Transfer;
