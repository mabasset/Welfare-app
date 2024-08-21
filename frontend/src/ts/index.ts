import '../styles/index.css';

import UserModel from './models/UserModel';
import RootController from './controllers/RootController';
import SignupController from './controllers/SignupController';
import RouterController from './controllers/RouterController';

["offline", "online"].forEach(event => 
	window.addEventListener(event, () => window.location.reload()));

document.addEventListener('DOMContentLoaded', () => {

	const userModel = new UserModel();

	const rootController = new RootController(userModel);
	const signupController = new SignupController(userModel);
	//const loginController = new LoginController(userModel);

	const routerController = new RouterController(userModel);
	routerController.addRoute('/', rootController.renderView.bind(rootController));
	routerController.addRoute('/signup', signupController.renderView.bind(signupController));
	//router.addRoute('/login', loginController);
	
	routerController.start();
});