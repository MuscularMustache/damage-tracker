import React from 'react';

const EnemyItem = props => {
  if (!props.enemy) {
    return <div />;
  }

	return <div>Enemy - {props.enemy.name} - {props.enemy.health}</div>;
}

export default EnemyItem;
