import ClassroomModel from './models/ClassroomModel.js';
import ClassroomView from './views/ClassroomView.js';
import ClassroomController from './controllers/ClassroomController.js';
import SearchModel from './models/SearchModel.js';
import SearchView from './views/SearchView.js';
import SearchController from './controllers/SearchController.js';
import SearchService from './services/SearchService.js';
import YoutubeManager from './manager/YoutubeManager.js';
import { dummyData } from './dummyData.js';
import { setListByKey, getListFromLocalStorage } from './utils/localStorage.js';
import { DB_KEY } from './constants.js';

// 초기 값 세팅 - 리뷰어님의 편의를 위해
if (!getListFromLocalStorage(DB_KEY.VIDEOS)) {
  setListByKey(DB_KEY.RECENT_KEYWORDS, ['테코톡', '우아한형제들', '배달의민족']);
  setListByKey(DB_KEY.VIDEOS, dummyData);
}

const classroomModel = new ClassroomModel();
const classroomView = new ClassroomView();
const searchModel = new SearchModel();
const searchView = new SearchView();
const searchService = new SearchService(searchModel);

const youtubeManager = new YoutubeManager({ searchModel, classroomModel, searchView, classroomView });
const classroomController = new ClassroomController({ classroomModel, classroomView });
const searchController = new SearchController({
  searchModel,
  searchView,
  searchService,
  youtubeManager,
});

classroomController.init();
searchController.init();
