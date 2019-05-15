import React, { Component } from 'react';
import EnemyCreate from './EnemyCreate';
import EnemyItem from './EnemyItem';
import HealthModal from './HealthModal';

import db from '../db';


class EnemyList extends Component {
  state = { enemies: [], showHealthModal: false }

  componentDidMount() {
    db.table('enemies')
      .toArray()
      .then((enemies) => {
        this.setState({ enemies });
      });
  }

  addEnemy = name => {
    const enemy = {
      name,
      health: 0,
      alive: true
    };
    db.table('enemies')
      .add(enemy)
      .then((id) => {
        const newList = [...this.state.enemies, Object.assign({}, enemy, { id })];
        this.setState({ enemies: newList });
      });
  };

  deleteEnemy = id => {
    db.table('enemies')
      .delete(id)
      .then(() => {
        const newList = this.state.enemies.filter(enemy => enemy.id !== id);
        this.setState({ enemies: newList });
      });
  }

  clearAllEnemies = id => {
    // FIGURE OUT HOW TO DO ALL
    db.table('enemies')
      .clear()
      .then(() => {
        this.setState({ enemies: [] });
      });
  }

  // editEnemyHealth = id => {
  //   console.log();
  // }

  toggleHealthModal = () => {
    this.setState({ showHealthModal: !this.state.showHealthModal });
  }

  render() {
    const { enemies } = this.state;
    return (
  		<div>
  			{enemies.map(enemy => {
          return (
            <EnemyItem
              key={enemy.id}
              enemy={enemy}
              deleteEnemy={this.deleteEnemy}
              toggleHealthModal={this.toggleHealthModal}
            />
          );
        })}
  			<EnemyCreate addEnemy={this.addEnemy} />
        <button onClick={this.clearAllEnemies}>Clear All Enemies</button>
        <HealthModal showHealthModal={this.state.showHealthModal} toggleHealthModal={this.toggleHealthModal} />
  		</div>
  	);
  }
}

export default EnemyList;
