import React from 'react';
import '../styles/enemyitem.scss';

const EnemyItem = ({enemy, deleteEnemy, toggleDeath, toggleHealthModal}) => {
  if (!enemy) {
    return <div />;
  }

	return (
    <div className={enemy.alive ? 'enemy-item' : 'enemy-item dead'}>
      <p onClick={() => toggleHealthModal(enemy)} className="unselect">{enemy.name} - <strong>{enemy.health}</strong>pts of damage</p>
      <i className="material-icons add-button death" onClick={() => toggleDeath(enemy.id, !enemy.alive)}>thumb_down</i>
      <i className="material-icons add-button" onClick={() => deleteEnemy(enemy.id)}>delete</i>
    </div>
  );
}

export default EnemyItem;
