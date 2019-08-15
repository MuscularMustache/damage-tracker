import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './components/App';
import EnemyList from './components/EnemyList';
import LandingPage from './components/LandingPage';
import DmEnemyList from './components/DmEnemyList';
import './styles/index.scss';

const Root = () => (
  <Router>
    <App>
      <Route path="/" exact component={LandingPage} />
      <Route path="/player" exact component={EnemyList} />
      <Route path="/dm" exact component={DmEnemyList} />
    </App>
  </Router>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
