import React from 'react';
import '../styles/enemyitem.scss';

const EnemyItem = ({enemy, toggleModal}) => {
  if (!enemy) {
    return <div />;
  }

  function EnemyNameAndHealth() {
    if (enemy.maxHealth === 'noHealth') {
      return (
        <p onClick={() => toggleModal(enemy, 'healthModal')} className="unselect">
          {enemy.name}: <strong>{enemy.health}</strong>pts of damage
        </p>
      );
    } else {
      return (
        <p onClick={() => toggleModal(enemy, 'healthModal')} className="unselect">
          {enemy.name}: <strong>{enemy.maxHealth - enemy.health}</strong> / {enemy.maxHealth}
        </p>
      );
    }
  }

	return (
    <div className={enemy.alive ? 'enemy-item' : 'enemy-item dead'}>
      <EnemyNameAndHealth />
      <i className="material-icons icon-button" onClick={() => toggleModal(enemy, 'optionModal')}>more_vert</i>
    </div>
  );
}

export default EnemyItem;
