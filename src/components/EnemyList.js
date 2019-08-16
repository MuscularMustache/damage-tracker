import React from 'react';
import EnemyItem from './EnemyItem';

const EnemyList = props => {
  if (props.enemies.length) {
    return props.enemies.map(enemy => {
      return (
        <EnemyItem
        key={enemy.id}
        enemy={enemy}
        toggleModal={props.toggleModal}
        />
      );
    })
  } else {
    return (
      <div className="no-enemies">
        <h3>No enemies to show</h3>
        <p>How about you add some below</p>
      </div>
    );
  }
}

export default EnemyList;
