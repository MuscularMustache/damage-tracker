import React, { Component } from 'react';
import EnemyCreate from './EnemyCreate';


class EnemyList extends Component {
  addEnemy = (name) => {
    console.log('enemy', name);
  };

  render() {
    return (
  		<div>
  			EnemyList
  			<EnemyCreate addEnemy={this.addEnemy} />
  		</div>
  	);
  }
}

export default EnemyList;


// localStorage.setItem('activeGame', JSON.stringify(storedConsequences));
// const arr = JSON.parse(localStorage.getItem(item)) || [];
// const storedConsequences = JSON.parse(localStorage.getItem('activeGame'));
