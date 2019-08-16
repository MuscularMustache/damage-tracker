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
    db.table(this.props.enemyTableName)
      .toArray()
      .then((enemies) => {
        this.setState({ enemies });
      });
  }

  addEnemy = (name, enemyMaxHealth) => {
    const enemy = {
      name,
      maxHealth: parseInt(enemyMaxHealth) || 'noHealth',
      health: 0,
      alive: true,
      healthHistory: []
    };
    db.table(this.props.enemyTableName)
      .add(enemy)
      .then((id) => {
        const newList = [...this.state.enemies, Object.assign({}, enemy, { id })];
        this.setState({ enemies: newList });
      });
  };

  deleteEnemy = id => {
    db.table(this.props.enemyTableName)
      .delete(id)
      .then(() => {
        const newList = this.state.enemies.filter(enemy => enemy.id !== id);
        this.setState({ enemies: newList, modalShown: false });
      });
  }

  toggleDeath = (id, alive) => {
    db.table(this.props.enemyTableName)
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

    db.table(this.props.enemyTableName)
      .clear()
      .then(() => {
        this.setState({ enemies: [] });
      });
  }

  evaluateHealth = (id, health, healthHistory) => {
    db.table(this.props.enemyTableName)
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
        <h2>{this.props.enemyTableName}</h2>
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
  			<EnemyCreate addEnemy={this.addEnemy} tableName={this.props.enemyTableName} />
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
