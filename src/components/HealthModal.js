import React, { Component } from 'react';

class HealthModal extends Component {
  render() {
    if (!this.props.showHealthModal) {
      return <div />
    }
    
    return (
      <div>HealthModal</div>
    );
  }
}

export default HealthModal;
