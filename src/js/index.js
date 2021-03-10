import ClassroomController from './controllers/ClassroomController.js';
import SearchController from './controllers/SearchController.js';

const classroomController = new ClassroomController();
const searchController = new SearchController();

window.addEventListener('DOMContentLoaded', () => {
  classroomController.init();
  searchController.init();
});
