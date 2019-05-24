import React from 'react';
import '../styles/enemyitem.scss';

const EnemyItem = ({enemy, toggleModal}) => {
  if (!enemy) {
    return <div />;
  }

	return (
    <div className={enemy.alive ? 'enemy-item' : 'enemy-item dead'}>
      <p onClick={() => toggleModal(enemy, 'healthModal')} className="unselect">{enemy.name} - <strong>{enemy.health}</strong>pts of damage</p>
      <i className="material-icons add-button" onClick={() => toggleModal(enemy, 'optionModal')}>more_vert</i>
    </div>
  );
}

export default EnemyItem;
