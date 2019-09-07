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

  const onSortStart = () => {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  }

  return (
    <SortableList
      items={props.enemies}
      onSortStart={onSortStart}
      onSortEnd={props.onSortEnd}
      pressDelay={300}
      pressThreshold={5}
      lockAxis='y'
    />
  );
}

export default EnemyList;
