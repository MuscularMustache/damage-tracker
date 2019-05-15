import React from 'react';

const EnemyItem = ({enemy, deleteEnemy, toggleHealthModal}) => {
  if (!enemy) {
    return <div />;
  }

	return (
    <div>
      <p onClick={() => toggleHealthModal()}>Enemy - {enemy.name} - {enemy.health}</p>
      <i className="material-icons add-button" onClick={() => deleteEnemy(enemy.id)}>delete</i>
    </div>
  );
}

export default EnemyItem;
