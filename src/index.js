import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './components/App';
import EnemyContainer from './components/EnemyContainer';
import LandingPage from './components/LandingPage';
import './styles/index.scss';

const Root = () => (
  <Router>
    <App>
      <Route path="/" exact component={LandingPage} />
      <Route path="/player" exact render={(props) => <EnemyContainer {...props} enemyTableName='enemies' />} />
      <Route path="/dm" exact render={(props) => <EnemyContainer {...props} enemyTableName='dmEnemies' />} />
    </App>
  </Router>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
