import React from 'react';
import '../styles/enemyitem.scss';

const EnemyItem = ({enemy, toggleModal}) => {
  if (!enemy) {
    return <div />;
  }

  const isDm = enemy.maxHealth !== 'noHealth';

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
  if (healthPercentage <= 50) {
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

  // NOTE: the reason the multi-line ternary is in place is because of a bug that was on mobile when reordering components
	return (
    <div className={enemy.alive ? 'enemy-item' : 'enemy-item dead'} style={itemStyle}>
      <p onClick={() => toggleModal(enemy, 'damageModal')} className="unselect">
        {enemy.statusEffects ? enemy.statusEffects.map(se => <span key={se.value} className={`${se.icon} ${se.value}`}></span>) : ''}
        {isDm ? (
          <span>{enemy.name}: <strong>{enemy.maxHealth - enemy.damage}</strong> / {enemy.maxHealth}</span>
        ) : (
          <span>{enemy.name} - <strong>{enemy.damage}</strong>pts of damage</span>
        )}
      </p>

      <p className="status-effects">
        {enemy.statusEffects ? enemy.statusEffects.map(se => <span key={se.value} className={se.value}>{se.label}</span>) : ''}
      </p>
      <i className="material-icons icon-button" onClick={() => toggleModal(enemy, 'optionModal')}>more_vert</i>
    </div>
  );
}

export default EnemyItem;
