import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
	<div>
		<nav className='navbar navbar-inverse'>
			<div className='container-fluid'>
				<div className='navbar-header'>
					<Link className='navbar-brand' to={ROUTES.LANDING}>
						Firebase Practice
					</Link>
				</div>
				<ul className='nav navbar-nav navbar-right'>
					<li>
						<Link to={ROUTES.HOME}>Home</Link>
					</li>
					<li>
						<Link to={ROUTES.SIGN_IN}>Sign In</Link>
					</li>
					<li>
						<Link to={ROUTES.LANDING}>Landing</Link>
					</li>
					<li>
						<Link to={ROUTES.ACCOUNT}>Account</Link>
					</li>
					<li>
						<Link to={ROUTES.ADMIN}>Admin</Link>
					</li>
					<li>
						<SignOutButton />
					</li>
				</ul>
			</div>
		</nav>
	</div>
);

export default Navigation;
