import React, { Component } from 'react';
import Modal from './Modal';
import '../styles/healthmodal.scss';

class HealthModal extends Component {
  state = { health: '', symbol: '+' }

  buttonClick = num => {
    this.setState({ health: `${this.state.health}${num}` });
  }

  evaluateHealth = type => {
    const { activeEnemy } = this.props;
    const stateHealth = parseInt(this.state.health);
    const activeHealth = parseInt(activeEnemy.health);
    const health = type === 'heal' ? activeHealth - stateHealth : activeHealth + stateHealth;
    const appendedHealth = type === 'heal' ? `- ${this.state.health}` : `+ ${this.state.health}`;
    const healthHistory = [...activeEnemy.healthHistory, appendedHealth];

    this.props.evaluateHealth(activeEnemy.id, health, healthHistory);
    this.setState({ health: ''});
  }

  toggleModal = () => {
    this.setState({ health: '' }, () => {
      this.props.toggleModal();
    })
  }

  deleteChar = () => {
    let health = this.state.health;
    this.setState({ health: health.substr(0, health.length-1)});
  }

  render() {
    const {show, activeModal, modalName} = this.props.modalState;
    if (!show || activeModal !== modalName) {
      return <div />
    }

    const { activeEnemy } = this.props;

    return (
        <Modal toggleModal={this.toggleModal} class="health-modal">
          <header>
            <h3>{activeEnemy.name} </h3>
            <h2>{activeEnemy.health} {this.state.symbol} {this.state.health}</h2>
            <i className="material-icons add-button" onClick={this.deleteChar}>backspace</i>
          </header>
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
            <button className="heal" disabled={(this.state.health.length <= 0)} onClick={() => this.evaluateHealth('heal')}>Heal</button>
            <button onClick={() => this.buttonClick(0)}>0</button>
            <button className="damage" disabled={(this.state.health.length <= 0)} onClick={() => this.evaluateHealth('damage')}>Damage</button>
          </div>
        </Modal>
    );
  }
}

export default HealthModal;
