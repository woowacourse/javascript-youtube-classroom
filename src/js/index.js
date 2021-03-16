import ClassroomModel from './models/ClassroomModel.js';
import ClassroomView from './views/ClassroomView.js';
import ClassroomController from './controllers/ClassroomController.js';
import SearchModel from './models/SearchModel.js';
import SearchView from './views/SearchView.js';
import SearchController from './controllers/SearchController.js';
import SearchService from './services/SearchService.js';

const classroomModel = new ClassroomModel();
const classroomView = new ClassroomView();
const classroomController = new ClassroomController({ classroomModel, classroomView });

const searchModel = new SearchModel();
const searchView = new SearchView();
const searchService = new SearchService(searchModel);
const searchController = new SearchController({
  searchModel,
  classroomModel,
  classroomView,
  searchView,
  searchService,
});

classroomController.init();
searchController.init();
