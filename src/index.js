import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './components/App';
import EnemyList from './components/EnemyList';
import LandingPage from './components/LandingPage';
import './styles/index.scss';

const Root = () => (
  <Router>
    <App>
      <Route path="/" exact component={LandingPage} />
      <Route path="/player" exact render={(props) => <EnemyList {...props} enemyTableName='enemies' />} />
      <Route path="/dm" exact render={(props) => <EnemyList {...props} enemyTableName='dmEnemies' />} />
    </App>
  </Router>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
