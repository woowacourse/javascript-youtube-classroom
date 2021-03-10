import ClassroomController from './controllers/ClassroomController.js';
import SearchController from './controllers/SearchController.js';
import ClassroomView from './views/ClassroomView.js';
import SearchView from './views/SearchView.js';

const classroomView = new ClassroomView();
const searchView = new SearchView();
const classroomController = new ClassroomController({ classroomView });
const searchController = new SearchController({ classroomView, searchView });

classroomController.init();
searchController.init();
