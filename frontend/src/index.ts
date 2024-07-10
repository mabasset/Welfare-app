import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Model from './models/Model';
import RootController from './controllers/RootController';
import SignupController from './controllers/SignupController';
import LoginController from './controllers/LoginController';
import Router from './Router';

document.addEventListener('DOMContentLoaded', () => {

	const model = new Model();
	const rootController = new RootController(model);
	const signupController = new SignupController(model);
	const loginController = new LoginController(model);

	const router = new Router();
	router.addRoute('/', rootController.renderView.bind(rootController));
	router.addRoute('/signup', signupController.renderView.bind(signupController));
	router.addRoute('/login', loginController.renderView.bind(loginController));
	
	router.start();
});