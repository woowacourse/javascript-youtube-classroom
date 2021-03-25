import hashController from './controller/hashController.js';
import watchingVideoController from './controller/watchingVideoController.js';
import watchedVideoController from './controller/watchedVideoController.js';
import modalController from './controller/modalController.js';

hashController.initRouteEventListeners();
modalController.initEventListeners();
modalController.initSearchQueries();
watchingVideoController.initEventListeners();
watchedVideoController.initEventListeners();
