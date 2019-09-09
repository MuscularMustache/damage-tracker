import React, { Component } from 'react';
import '../styles/enemycreate.scss';

class EnemyCreate extends Component {
	state = { enemyName: '', enemyMaxHealth: '' }

  onInputChange = (event, stateName) => {
    this.setState({ [stateName]: event.target.value });
  };

  addEnemy = () => {
		if (this.state.enemyName === '' || (this.props.tableName === 'dmEnemies' && this.state.enemyMaxHealth === '')) {
			return;
		}

    this.setState({ enemyName: '', enemyMaxHealth: '' });
    this.props.addEnemy(this.state.enemyName, this.state.enemyMaxHealth);
  }

	keyPress = e => {
		if (e.keyCode === 13){
			this.addEnemy();
		}
	}

	healthInput = () => {
		if (this.props.tableName === 'dmEnemies') {
			return (
				<input
					aria-label="enemyMaxHealth"
					onChange={e => this.onInputChange(e, 'enemyMaxHealth')}
					value={this.state.enemyMaxHealth}
					type='number'
					onKeyDown={this.keyPress}
					className="standard-input"
					placeholder="Health"
				/>
			);
		}
	}

	render() {
		return (
			<div className="enemy-create">
        <div className="enemy-input">
          <input
						aria-label="enemyName"
            onChange={e => this.onInputChange(e, 'enemyName')}
            value={this.state.enemyName}
						onKeyDown={this.keyPress}
            className="standard-input"
						placeholder="Enemy"
          />
					{this.healthInput()}
          <button className="icon-text-button" onClick={this.addEnemy}>
            <span className="fas fa-plus icon-button" />
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
