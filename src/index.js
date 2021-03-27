import routeController from './controller/routeController.js';
import savedVideoController from './controller/savedVideoController.js';
import searchModalController from './controller/searchModalController.js';

routeController.initRouteEventListeners();
searchModalController.initEventListeners();
searchModalController.initSearchQueries();
savedVideoController.initEventListeners();
