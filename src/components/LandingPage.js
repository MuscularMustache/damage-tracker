import React from 'react';
import { Link } from "react-router-dom";
import '../styles/landingpage.scss';

const LandingPage = () => {
	return (
		<div>
			<Link className="link-button" to="/dm">Master of Puppets</Link>
			<Link className="link-button" to="/player">Puppets</Link>
		</div>
	);
}

export default LandingPage;
