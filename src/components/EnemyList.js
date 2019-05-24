import React, { Component } from 'react';
import EnemyCreate from './EnemyCreate';
import EnemyItem from './EnemyItem';
import HealthModal from './HealthModal';
import OptionModal from './OptionModal';
import '../styles/enemylist.scss';

import db from '../db';


class EnemyList extends Component {
  state = { enemies: [], modalShown: false, modalActive: '', activeEnemy: {} }

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
      alive: true,
      healthHistory: []
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
        this.setState({ enemies: newList, modalShown: false });
      });
  }

  toggleDeath = (id, alive) => {
    db.table('enemies')
      .update(id, { alive })
      .then(() => {
        let index;
        const enemyToUpdate = this.state.enemies.find(enemy => enemy.id === id);
        const enemyObj = Object.assign({}, enemyToUpdate, { alive });
        const newList = [
          ...this.state.enemies.filter((enemy, idx) => {
            if (enemy.id === id) { index = idx; }
            return enemy.id !== id;
          })
        ];
        if (alive) {
          newList.splice(index, 0, enemyObj)
        } else {
          newList.push(enemyObj)
        }
        this.setState({ enemies: newList, modalShown: false });
      });
  }

  clearAllEnemies = id => {
    if (!window.confirm("Are you sure you want to delete all of the enemies? This cannot be undone!")) {
      return;
    }

    db.table('enemies')
      .clear()
      .then(() => {
        this.setState({ enemies: [] });
      });
  }

  evaluateHealth = (id, health, healthHistory) => {
    db.table('enemies')
      .update(id, { health, healthHistory })
      .then(() => {
        let index;
        const enemyToUpdate = this.state.enemies.find(enemy => enemy.id === id);
        const newList = [
          ...this.state.enemies.filter((enemy, idx) => {
            if (enemy.id === id) {
              index = idx;
            }
            return enemy.id !== id;
          })
        ];
        newList.splice(index, 0, Object.assign({}, enemyToUpdate, { health, healthHistory }))
        this.setState({ enemies: newList, modalShown: false });
      });
  }

  toggleModal = (enemy, modalName) => {
    this.setState({ modalShown: !this.state.modalShown, modalActive: modalName || '', activeEnemy: enemy || {} });
  }

  render() {
    const { enemies } = this.state;
    return (
  		<div className="enemy-list">
        <div className="enemy-item-wrap">
  			{enemies.map(enemy => {
          return (
            <EnemyItem
              key={enemy.id}
              enemy={enemy}
              toggleModal={this.toggleModal}
            />
          );
        })}
        </div>
  			<EnemyCreate addEnemy={this.addEnemy} />
        <button className="clear-all" onClick={this.clearAllEnemies}>Clear All</button>
        <HealthModal
          modalState={{show: this.state.modalShown, activeModal: this.state.modalActive, modalName: 'healthModal'}}
          toggleModal={this.toggleModal}
          activeEnemy={this.state.activeEnemy}
          evaluateHealth={this.evaluateHealth}
        />
        <OptionModal
          modalState={{show: this.state.modalShown, activeModal: this.state.modalActive, modalName: 'optionModal'}}
          toggleModal={this.toggleModal}
          activeEnemy={this.state.activeEnemy}
          deleteEnemy={this.deleteEnemy}
          toggleDeath={this.toggleDeath}
        />
  		</div>
  	);
  }
}

export default EnemyList;
