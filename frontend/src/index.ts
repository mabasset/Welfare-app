import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Model from './models/Model';
import RootController from './controllers/RootController';
import Router from './Router';

document.addEventListener('DOMContentLoaded', () => {

	const model = new Model();
	const rootController = new RootController(model);

	const router = new Router();
	router.addRoute('/', rootController.renderView.bind(rootController) )
	
	router.start();
});