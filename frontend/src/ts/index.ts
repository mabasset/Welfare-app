import '../styles/index.css';

import ProfilingModel from './models/ProfilingModel';
import RootController from './controllers/RootController';
import SignupController from './controllers/SignupController';
import LoginController from './controllers/LoginController';
import Router from './Router';

//["offline", "online"].forEach(event => 
//	window.addEventListener(event, () => window.location.reload()));

document.addEventListener('DOMContentLoaded', () => {
	const profilingModel = new ProfilingModel();

	const rootController = new RootController(profilingModel);
	const signupController = new SignupController(profilingModel);
	const loginController = new LoginController(profilingModel);

	const router = new Router();
	router.addRoute('/', rootController.renderView.bind(rootController));
	router.addRoute('/signup', signupController.renderView.bind(signupController));
	router.addRoute('/login', loginController.renderView.bind(loginController));
	
	router.start();
});