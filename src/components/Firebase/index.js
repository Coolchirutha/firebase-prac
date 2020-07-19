import FirebaseContext, { withFirebase } from './context';
import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		this.auth = app.auth();
	}

	// Authentication API
	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth
			.createUserWithEmailAndPassword(email, password)
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	};

	doSignInWithEmailAndPassword = (email, password) => {
		return this.auth.signInWithEmailAndPassword(email, password)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
	};

	doSignOut = () => {
		return this.auth.signOut()
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
	};

	doPasswordReset = (email) => {
		return this.auth.sendPasswordResetEmail(email)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
	};

	doPasswordUpdate = (password) => {
		return this.auth.currentUser.updatePassword(password)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
	};
}
export default Firebase;
export { FirebaseContext, withFirebase };
