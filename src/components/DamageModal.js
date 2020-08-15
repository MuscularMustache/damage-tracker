import React, { Component } from 'react';
import Modal from './Modal';
import '../styles/damagemodal.scss';

class DamageModal extends Component {
  state = { damage: '', symbol: '+', isDm: false, activeEnemyId: null }

  static getDerivedStateFromProps(props, state) {
    if (props.activeEnemy.id !== state.activeEnemyId) {
      const isDm = props.activeEnemy.maxHealth !== 'noHealth';

      return {
        symbol: isDm ? '-' : '+',
        isDm: isDm ? true : false,
        activeEnemyId: props.activeEnemy.id,
      };
    }

    // No state update necessary
    return null;
  }

  buttonClick = num => {
    this.setState({ damage: `${this.state.damage}${num}` });
  }

  evaluateDamage = type => {
    const { activeEnemy } = this.props;
    const previousDamage = parseInt(this.state.damage);
    const currentDamage = parseInt(activeEnemy.damage);
    let totalDamage;
    let appendedDamage;

    if (type === 'heal' && activeEnemy.maxHealth !== 'noHealth') {
        totalDamage = Math.sign(currentDamage - previousDamage) === -1 ? 0 : currentDamage - previousDamage;
    } else if (type === 'heal') {
        totalDamage = (currentDamage - previousDamage) < 0 ? 0 : currentDamage - previousDamage;
    } else {
      totalDamage = currentDamage + previousDamage;
    }

    if (this.state.isDm) {
      appendedDamage = type === 'heal' ? `+ ${this.state.damage}` : `- ${this.state.damage}`;
    } else {
      appendedDamage = type === 'heal' ? `- ${this.state.damage}` : `+ ${this.state.damage}`;
    }

    const damageHistory = [...activeEnemy.damageHistory, appendedDamage];

    this.props.evaluateDamage(activeEnemy.id, totalDamage, damageHistory);
    this.setState({ damage: ''});
  }

  toggleModal = () => {
    this.setState({ damage: '' }, () => {
      this.props.toggleModal();
    })
  }

  deleteChar = () => {
    let damage = this.state.damage;
    this.setState({ damage: damage.substr(0, damage.length-1)});
  }

  render() {
    const {show, activeModal, modalName} = this.props.modalState;
    if (!show || activeModal !== modalName) {
      return <div />
    }

    const { activeEnemy } = this.props;

    return (
        <Modal toggleModal={this.toggleModal} class="damage-modal">
          <header>
            <h3>{activeEnemy.name} </h3>
            <h2>
              {this.state.isDm ? activeEnemy.maxHealth - activeEnemy.damage : activeEnemy.damage} {this.state.symbol} {this.state.damage}
            </h2>
            <span className="icon-button" onClick={this.deleteChar}>
              <img src={process.env.PUBLIC_URL + '/images/backspace.svg'} alt="delete character" />
            </span>
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
            <button className="heal" disabled={(this.state.damage.length <= 0)} onClick={() => this.evaluateDamage('heal')}>Heal</button>
            <button onClick={() => this.buttonClick(0)}>0</button>
            <button className="damage" disabled={(this.state.damage.length <= 0)} onClick={() => this.evaluateDamage('damage')}>Damage</button>
          </div>
        </Modal>
    );
  }
}

export default DamageModal;
