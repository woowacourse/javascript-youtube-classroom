import modalController from './controller/modalController.js';
import watchinVideoController from './controller/watchingVideoController.js';

modalController.initEventListeners();
modalController.initSearchQueries();
watchinVideoController.loadWatchingVideos();