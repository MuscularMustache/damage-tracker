import React, { Component } from 'react';

class HealthModal extends Component {
  state = { health: '', symbol: '+' }

  buttonClick = num => {
    this.setState({ health: `${this.state.health}${num}` });
  }

  evaluateHealth = (type) => {
    const { activeEnemy } = this.props;
    const stateHealth = parseInt(this.state.health);
    const activeHealth = parseInt(activeEnemy.health);
    const health =  type === 'heal' ? activeHealth - stateHealth : activeHealth + stateHealth;
    this.props.evaluateHealth(activeEnemy.id, health);
    this.setState({ health: ''});
  }

  render() {
    if (!this.props.showHealthModal) {
      return <div />
    }

    const { activeEnemy } = this.props;

    return (
      <div>
        <h1>{activeEnemy.health} {this.state.symbol} {this.state.health}</h1>
        HealthModal - active - {activeEnemy.name}
        <div className="row">
          <button onClick={() => this.buttonClick(7)}>7</button>
          <button onClick={() => this.buttonClick(8)}>8</button>
          <button onClick={() => this.buttonClick(9)}>9</button>
        </div>
        <div className="row">
          <button onClick={() => this.buttonClick(4)}>4</button>
          <button onClick={() => this.buttonClick(5)}>5</button>
          <button onClick={() => this.buttonClick(6)}>6</button>
        </div>
        <div className="row">
          <button onClick={() => this.buttonClick(1)}>1</button>
          <button onClick={() => this.buttonClick(2)}>2</button>
          <button onClick={() => this.buttonClick(3)}>3</button>
        </div>
        <div className="row">
          <button onClick={() => this.evaluateHealth('heal')}>Heal</button>
          <button onClick={() => this.buttonClick(0)}>0</button>
          <button onClick={() => this.evaluateHealth('damage')}>Damage</button>
        </div>

      </div>
    );
  }
}

export default HealthModal;
