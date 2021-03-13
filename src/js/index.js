import SearchController from './controller/search.js';
import ModalController from './controller/modal.js';
import StorageModel from './model/storage.js';
import YoutubeModel from './model/youtube.js';
import SearchView from './view/search.js';

const youtube = new YoutubeModel();
const storage = new StorageModel();
const view = new SearchView();
const controller = new SearchController(youtube, storage, view);
const modal = new ModalController();

controller.init();
modal.init();
