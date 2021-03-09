import SearchController from './controller/search.js';
import ModalController from './controller/modal.js';
import SavedController from './controller/saved.js';
import StorageModel from './model/storage.js';
import YoutubeModel from './model/youtube.js';
import SearchView from './view/search.js';
import SavedView from './view/saved.js';
import NavView from './view/nav.js';
import SnackBarView from './view/snackbar.js';

const youtubeModel = new YoutubeModel();
const storageModel = new StorageModel();

const searchView = new SearchView();
const savedView = new SavedView();
const navView = new NavView();
const snackBarView = new SnackBarView();

const searchController = new SearchController(
  youtubeModel,
  storageModel,
  searchView,
  savedView,
  snackBarView
);
const savedController = new SavedController(
  storageModel,
  savedView,
  navView,
  snackBarView
);
const modalController = new ModalController(
  storageModel,
  savedView,
  searchView
);

searchController.init();
savedController.init();
modalController.init();
