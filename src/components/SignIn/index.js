import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
	<div>
		<SignInForm />
        <PasswordForgetLink />
		<SignUpLink />
	</div>
);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { email, password } = this.state;

		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
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
		const { email, password, error } = this.state;

		const isInvalid = password === '' || email === '';

		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Log In</h1>
							<p className='lead text-center'>
								Sign in to your Firebase Practice account
							</p>
							<form onSubmit={this.onSubmit}>
								<div className='form-group'>
									<input
										type='email'
										className='form-control form-control-lg'
										placeholder='Email Address'
										name='email'
										value={email}
										onChange={this.onChange}
									/>
								</div>
								<div className='form-group'>
									<input
										type='password'
										className='form-control form-control-lg'
										placeholder='Password'
										name='password'
										value={password}
										onChange={this.onChange}
									/>
								</div>

								<button
									disabled={isInvalid}
									className='btn btn-info btn-block mt-4'
									type='submit'
								>
									Sign In
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

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
