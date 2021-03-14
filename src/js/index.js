import SearchController from './controller/search.js';
import ModalController from './controller/modal.js';
import SavedController from './controller/saved.js';
import StorageModel from './model/storage.js';
import YoutubeModel from './model/youtube.js';
import SearchView from './view/search.js';
import SavedView from './view/saved.js';
import SnackBarView from './view/snackbar.js';

const youtubeModel = new YoutubeModel();
const storageModel = new StorageModel();

const searchView = new SearchView();
const savedView = new SavedView();
const snackBarView = new SnackBarView();

const searchController = new SearchController({
  model: { youtubeModel, storageModel },
  view: { searchView, savedView, snackBarView },
});
const savedController = new SavedController({
  model: { storageModel },
  view: { savedView, snackBarView },
});
const modalController = new ModalController({
  model: { storageModel },
  view: { searchView },
});

searchController.init();
savedController.init();
modalController.init();
