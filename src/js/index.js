import StorageModel from './models/StorageModel.js';
import StorageView from './views/StorageView.js';
import StorageController from './controllers/StorageController.js';
import SearchModel from './models/SearchModel.js';
import SearchView from './views/SearchView.js';
import SearchController from './controllers/SearchController.js';
import SearchService from './services/SearchService.js';

const storageModel = new StorageModel();
const storageView = new StorageView();
const storageController = new StorageController({ storageModel, storageView });

const searchModel = new SearchModel();
const searchView = new SearchView();
const searchService = new SearchService(searchModel);
const searchController = new SearchController({
  searchModel,
  storageModel,
  storageView,
  searchView,
  searchService,
});

storageController.init();
searchController.init();
