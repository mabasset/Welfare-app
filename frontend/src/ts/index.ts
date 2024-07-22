import '../styles/index.css';

import Model from './models/Model';
import ProfilingModel from './models/ProfilingModel';
import RootController from './controllers/RootController';
import SignupController from './controllers/SignupController';
import LoginController from './controllers/LoginController';
import Router from './Router';

document.addEventListener('DOMContentLoaded', () => {

	const model = new Model();
	const profilingModel = new ProfilingModel();

	const rootController = new RootController(model);
	const signupController = new SignupController(profilingModel);
	const loginController = new LoginController(profilingModel);

	const router = new Router();
	router.addRoute('/', rootController.renderView.bind(rootController));
	router.addRoute('/signup', signupController.renderView.bind(signupController));
	router.addRoute('/login', loginController.renderView.bind(loginController));
	
	router.start();
});