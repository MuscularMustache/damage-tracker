import React from 'react';
import { Link } from "react-router-dom";
import '../styles/landingpage.scss';

const LandingPage = () => {
	return (
		<div>
			<h3>Welcome to Damage Tracker.</h3>
			<p>Where either dungeon masters or players can keep track of the health of enemies.</p>
			<p>This is a continually developed personal project with more features that will get added in whenever I have time.</p>
			<p>To speek up the process, feel free to donate below. If the button isn't there I haven't built it yet.</p>
			<Link className="link-button" to="/dm">Master of Puppets</Link>
			<Link className="link-button" to="/player">Puppets</Link>
		</div>
	);
}

export default LandingPage;
