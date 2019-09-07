import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './components/App';
import EnemyContainer from './components/EnemyContainer';
import LandingPage from './components/LandingPage';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
