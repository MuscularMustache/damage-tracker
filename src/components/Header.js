import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import '../styles/header.scss';

const Header = () => {
	return (
		<header className="app-header">
				<h2><Link to="/">Damage Tracker</Link></h2>
		</header>
	);
}

export default Header;
