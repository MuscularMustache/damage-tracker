import React from 'react';

const EnemyItem = props => {
  if (!props.enemy) {
    return <div />;
  }

	return (
    <div>
      <p>Enemy - {props.enemy.name} - {props.enemy.health}</p>
      <i className="material-icons add-button" onClick={() => props.deleteEnemy(props.enemy.id)}>delete</i>
    </div>
  );
}

export default EnemyItem;
