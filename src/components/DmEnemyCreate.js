import React, { Component } from 'react';
import '../styles/enemycreate.scss';

class EnemyCreate extends Component {
	state = { enemyName: '' }

  onInputChange = event => {
    this.setState({ enemyName: event.target.value });
  };

  addEnemy = () => {
		if (this.state.enemyName === '') {
			return;
		}

    this.setState({ enemyName: '' });
    this.props.addEnemy(this.state.enemyName);
  }

	keyPress = e => {
		if (e.keyCode === 13){
			this.addEnemy();
		}
	}

	render() {
		return (
			<div className="enemy-create">
        <div className="enemy-input">
          <input
            onChange={this.onInputChange}
            value={this.state.enemyName}
						onKeyDown={this.keyPress}
            className="standard-input"
          />
          <button className="icon-text-button" onClick={this.addEnemy}>
            <i className="material-icons icon-button">add</i>
            <span>
              Add Enemy
            </span>
          </button>
        </div>
			</div>
		);
	}
}

export default EnemyCreate;
