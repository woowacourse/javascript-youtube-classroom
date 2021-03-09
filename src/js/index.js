import Store from './models/Store.js';
import YoutubeController from './controllers/YoutubeController.js';
import SearchModalController from './controllers/SearchModalController.js';

const store = new Store();

const youtubeController = new YoutubeController(store);
const searchModalController = new SearchModalController(store);

youtubeController.init();
searchModalController.init();

store.register(youtubeController);
store.register(searchModalController);
