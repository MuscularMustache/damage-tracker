import React from 'react';
import EnemyItem from './EnemyItem';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const EnemyList = props => {
  if (!props.enemies.length) {
    return (
      <div className="enemy-item-wrap no-enemies">
        <h3>No enemies to show</h3>
        <p>How about you add some below</p>
      </div>
    );
  }

  const SortableItem = SortableElement(({value}) => <EnemyItem enemy={value} toggleModal={props.toggleModal} />);

  const SortableList = SortableContainer(({items}) => {
    return (
      <div className="enemy-item-wrap">
        {props.enemies.map((enemy, index) => (
          <SortableItem key={`item-${enemy.id}`} index={index} value={enemy} />
        ))}
      </div>
    );
  });

  return <SortableList items={props.enemies} onSortEnd={props.onSortEnd} pressDelay={500}/>;
}

export default EnemyList;
