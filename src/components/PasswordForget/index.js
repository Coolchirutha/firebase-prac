import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
	<div>
		<h1>Forgot Password?</h1>
		<PasswordForgetForm />
	</div>
);

const INITIAL_STATE = {
	email: '',
	error: null,
};

class PasswordForgetFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { email } = this.state;
		this.props.firebase.doPasswordReset(email).then(() => {
			this.setState({ ...INITIAL_STATE });
		});

		event.preventDefault();
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, error } = this.state;

		const isInvalid = email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type='text'
					name='email'
					value={this.state.email}
					onChange={this.onChange}
					placeholder='Email address'
				/>
				<button disabled={isInvalid} type='submit'>
					Reset Password
				</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const PasswordForgetLink = () => (
	<p className='text-center'>
		<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
