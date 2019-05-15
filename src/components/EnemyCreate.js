import React, { Component } from 'react';
import '../styles/enemycreate.scss';

class EnemyCreate extends Component {
	state = { enemyName: '', showField: false }

  onInputChange = event => {
    this.setState({ enemyName: event.target.value });
  };

  addEnemy = () => {
    this.setState({ enemyName: '' });
    this.props.addEnemy(this.state.enemyName);
  }

	render() {
		return (
			<div className="enemy-create">
        <div className={this.state.showField ? 'enemy-input show' : 'enemy-input hide'}>
          <input
            onChange={this.onInputChange}
            value={this.state.enemyName}
            className="standard-input"
          />
          <button onClick={this.addEnemy}>
            <i className="material-icons add-button" onClick={() => this.setState({ showField: !this.state.showField })}>add</i>
            <span>
              Add Enemy
            </span>
          </button>
        </div>

				<i className="material-icons add-button hide" onClick={() => this.setState({ showField: !this.state.showField })}>add</i>
			</div>
		);
	}
}

export default EnemyCreate;
