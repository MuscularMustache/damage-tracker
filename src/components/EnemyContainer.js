import React, { Component } from 'react';
import arrayMove from 'array-move';
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
        // sort enemies by their initiative
        this.setState({ enemies: enemies.sort((a, b) => a.initiative - b.initiative) });
      });
  }

  addEnemy = (name, enemyMaxHealth, enemyArmorClass) => {
    const enemy = {
      name,
      maxHealth: parseInt(enemyMaxHealth) || 'noHealth',
      damage: 0,
      alive: true,
      armorClass: parseInt(enemyArmorClass) || 0,
      damageHistory: [],
      statusEffects: [],
      initiative: this.state.enemies.length
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

  toggleDeath = (id, alive, maxHealth) => {
    const fieldsToUpdate = { alive };
    if (alive && maxHealth !== 'noHealth') { fieldsToUpdate.damage = maxHealth - 1; }
    db.table(this.props.enemyTableName)
      .update(id, fieldsToUpdate)
      .then(() => {
        let index;
        const enemyToUpdate = this.state.enemies.find(enemy => enemy.id === id);
        const enemyObj = Object.assign({}, enemyToUpdate, fieldsToUpdate);
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

  onSortEnd = ({oldIndex, newIndex}) => {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    let enemies = arrayMove(this.state.enemies, oldIndex, newIndex);

    this.setState({ enemies }, () => {
      // come up with a better way of writeing this
      // maybe try Use bulkPut instead of looping
      enemies.forEach((enemy, index) => {
        db.table(this.props.enemyTableName)
          .update(enemy.id, { initiative: index })
      });
    });
  };

  statusSelect = (statusEffects, id) => {
    // TODO: GENERALIZE THIS - ITS NEAR IDENTICAL TO TOGGLEDEATH OTHER THAN FIELD UPDATED AND modalShown
    db.table(this.props.enemyTableName)
      .update(id, { statusEffects })
      .then(() => {
        let index;
        const enemyToUpdate = this.state.enemies.find(enemy => enemy.id === id);
        const enemyObj = Object.assign({}, enemyToUpdate, { statusEffects });
        const newList = [
          ...this.state.enemies.filter((enemy, idx) => {
            if (enemy.id === id) { index = idx; }
            return enemy.id !== id;
          })
        ];
        newList.splice(index, 0, enemyObj)
        this.setState({ enemies: newList });
      });
  }

  render() {
    return (
  		<div className={`enemy-list ${this.props.enemyTableName === 'dmEnemies' ? 'dm-enemy-list' : ''}`}>
    		<EnemyList enemies={this.state.enemies} toggleModal={this.toggleModal} onSortEnd={this.onSortEnd} />
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
          statusSelect={this.statusSelect}
        />
  		</div>
  	);
  }
}

export default EnemyContainer;
