import React, { Component } from 'react';
import EnemyCreate from './EnemyCreate';
import EnemyItem from './EnemyItem';
import db from '../db';


class EnemyList extends Component {
  state = { enemies: [] }

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

  render() {
    const { enemies } = this.state;
    return (
  		<div>
  			{enemies.map(enemy => <EnemyItem key={enemy.id} enemy={enemy} deleteEnemy={this.deleteEnemy} />)}
  			<EnemyCreate addEnemy={this.addEnemy} />
  		</div>
  	);
  }
}

export default EnemyList;
