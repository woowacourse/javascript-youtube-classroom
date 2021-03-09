import SearchController from './controller/search.js';
import ModalController from './controller/modal.js';
import SavedController from './controller/saved.js';
import StorageModel from './model/storage.js';
import YoutubeModel from './model/youtube.js';
import SearchView from './view/search.js';
import SavedView from './view/saved.js';

const youtubeModel = new YoutubeModel();
const storageModel = new StorageModel();

const searchView = new SearchView();
const savedView = new SavedView();

const searchController = new SearchController(
  youtubeModel,
  storageModel,
  searchView
);
const savedController = new SavedController(storageModel, savedView);
const modalController = new ModalController();

searchController.init();
savedController.init();
modalController.init();
