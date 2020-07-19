import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
	</p>
);

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { username, email, passwordOne } = this.state;

		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});

		event.preventDefault();
	};

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';
		return (
			<div className='register'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<form onSubmit={this.onSubmit}>
								<div className='form-group'>
									<input
										name='username'
										value={username}
										onChange={this.onChange}
										type='text'
										placeholder='Username'
										className='form-control form-control-lg'
									/>
								</div>
								<div className='form-group'>
									<input
										name='email'
										value={email}
										onChange={this.onChange}
										type='text'
										placeholder='Email Address'
										className='form-control form-control-lg'
									/>
								</div>
								<div className='form-group'>
									<input
										name='passwordOne'
										value={passwordOne}
										onChange={this.onChange}
										type='password'
										placeholder='Password'
										className='form-control form-control-lg'
									/>
								</div>
								<div className='form-group'>
									<input
										name='passwordTwo'
										value={passwordTwo}
										onChange={this.onChange}
										type='password'
										placeholder='Confirm Password'
										className='form-control form-control-lg'
									/>
								</div>
								<button
									disabled={isInvalid}
									type='submit'
									className='btn btn-info btn-block mt-4'
								>
									Sign Up
								</button>
								{error && <p>{error.message}</p>}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const SignUpPage = () => (
	<div>
		<h1 className='display-4 text-center'>Sign Up</h1>
		<p className='lead text-center'>
			Create your Firebase Practice account
		</p>

		<SignUpForm />
	</div>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
