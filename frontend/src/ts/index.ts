import '../styles/index.css';

import UserModel from './models/UserModel';
import RootController from './controllers/RootController';
import SignupController from './controllers/SignupController';
import LoginController from './controllers/LoginController';
import Router from './Router';

["offline", "online"].forEach(event => 
	window.addEventListener(event, () => window.location.reload()));

document.addEventListener('DOMContentLoaded', () => {

	const userModel = new UserModel();

	const rootController = new RootController(userModel);
	const signupController = new SignupController(userModel);
	//const loginController = new LoginController(profilingModel);

	const router = new Router(rootController, userModel);
	//router.addRoute('/signup', signupController);
	//router.addRoute('/login', loginController);
	
	router.start();
});