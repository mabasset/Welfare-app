import '../styles/index.css';

import UserModel from './models/User';
import RootController from './controllers/Root';
import SignupController from './controllers/Signup';
import LoginController from './controllers/Login';

["offline", "online"].forEach(event => 
	window.addEventListener(event, () => window.location.reload()));

document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
		document.documentElement.classList.add('dark')

	const userModel = new UserModel();
	
	const rootController = new RootController(userModel);
	const signupController = new SignupController(userModel);
	const loginController = new LoginController(userModel);

	rootController.addRoute('/signup', signupController.renderView.bind(signupController));
	rootController.addRoute('/login', loginController.renderView.bind(loginController));

	rootController.startRouting();
});