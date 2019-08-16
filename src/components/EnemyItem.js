import React from 'react';
import '../styles/enemyitem.scss';

const EnemyItem = ({enemy, toggleModal}) => {
  if (!enemy) {
    return <div />;
  }

  const isDm = enemy.maxHealth !== 'noHealth';
  function EnemyNameAndHealth() {
    if (!isDm) {
      return (
        <p onClick={() => toggleModal(enemy, 'damageModal')} className="unselect">
          {enemy.name} - <strong>{enemy.damage}</strong>pts of damage
        </p>
      );
    } else {
      return (
        <p onClick={() => toggleModal(enemy, 'damageModal')} className="unselect">
          {enemy.name}: <strong>{enemy.maxHealth - enemy.damage}</strong> / {enemy.maxHealth}
        </p>
      );
    }
  }

  let healthPercentage = ((enemy.maxHealth-enemy.damage)/enemy.maxHealth)*100;

  // this overwrites the css to create a "health bar"
  let itemStyle = {
    background: `linear-gradient(90deg,
      rgba(255, 255, 255, .4) 0%,
      rgba(255, 255, 255, .4) ${healthPercentage}%,
      rgba(255, 255, 255, 0) ${healthPercentage}%,
      rgba(255, 255, 255, 0) 100%
    )`
  }

  // bloodied
  if (healthPercentage < 50) {
    itemStyle = {
      background: `linear-gradient(90deg,
        rgba(255, 0, 0, .4) 0%,
        rgba(255, 0, 0, .4) ${healthPercentage}%,
        rgba(255, 0, 0, 0) ${healthPercentage}%,
        rgba(255, 0, 0, 0) 100%
      )`
    }
  }

  if (!isDm) {
    itemStyle = {}
  }

	return (
    <div className={enemy.alive ? 'enemy-item' : 'enemy-item dead'} style={itemStyle}>
      <EnemyNameAndHealth />
      <p className="status-effects">{enemy.statusEffects.map(se => <span key={se.value} className={se.value}>{se.label}</span>)}</p>
      <i className="material-icons icon-button" onClick={() => toggleModal(enemy, 'optionModal')}>more_vert</i>
    </div>
  );
}

export default EnemyItem;
