import React, { Component } from 'react';
import EnemyCreate from './EnemyCreate';
import EnemyList from './EnemyList';
import DamageModal from './DamageModal';
import OptionModal from './OptionModal';
import '../styles/enemylist.scss';

import db from '../db';


class EnemyContainer extends Component {
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
      damage: 0,
      alive: true,
      damageHistory: []
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
        newList.splice(index, 0, enemyObj)
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

  evaluateDamage = (id, damage, damageHistory) => {
    db.table(this.props.enemyTableName)
      .update(id, { damage, damageHistory })
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
        newList.splice(index, 0, Object.assign({}, enemyToUpdate, { damage, damageHistory }))
        this.setState({ enemies: newList, modalShown: false }, () => {
          // if enemy has taken more damage than its max health then kill it
          if (enemyToUpdate.maxHealth !== 'noHealth' && damage >= enemyToUpdate.maxHealth) {
            this.toggleDeath(id, false);
          }
        });
      });
  }

  toggleModal = (enemy, modalName) => {
    this.setState({ modalShown: !this.state.modalShown, modalActive: modalName || '', activeEnemy: enemy || {} });
  }

  render() {
    return (
  		<div className={`enemy-list ${this.props.enemyTableName === 'dmEnemies' ? 'dm-enemy-list' : ''}`}>
        <div className="enemy-item-wrap">
    			<EnemyList enemies={this.state.enemies} toggleModal={this.toggleModal} />
        </div>
  			<EnemyCreate addEnemy={this.addEnemy} tableName={this.props.enemyTableName} />
        <button className="clear-all" onClick={this.clearAllEnemies}>Clear All</button>
        <DamageModal
          modalState={{show: this.state.modalShown, activeModal: this.state.modalActive, modalName: 'damageModal'}}
          toggleModal={this.toggleModal}
          activeEnemy={this.state.activeEnemy}
          evaluateDamage={this.evaluateDamage}
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

export default EnemyContainer;
