
import SearchVideoManager from './Manager/SearchVideoManager';
import SaveVideoManager from './Manager/SaveVideoManager';
import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import { addListener } from './util/event';
import { EVENT } from './constants';
import { $ } from './util';

const homeView = new HomeView();
const searchModalView = new SearchModalView();

addListener(EVENT.UPDATE_SAVED_VIDEO_LIST, homeView.savedVideoListView.updateOnSavedVideoList.bind(homeView.savedVideoListView), $('#app'));

addListener(EVENT.UPDATE_SEARCH_STATE, searchModalView.searchResultView.updateOnSearchState.bind(searchModalView.searchResultView), $('#modal-container'));
addListener(EVENT.RESPONSE_SAVE_VIDEO, searchModalView.searchResultView.onResponseSaveVideo.bind(searchModalView.searchResultView), $('#modal-container'));

const searchVideoManager = new SearchVideoManager();
const saveVideoManager = new SaveVideoManager();

addListener(EVENT.REQUEST_CHANGE_VIDEO_WATCHED_INFO, saveVideoManager.changeWatchedInfo.bind(saveVideoManager), $('#app'));
addListener(EVENT.REQUEST_DELETE_VIDEO, saveVideoManager.deleteVideo.bind(saveVideoManager), $('#app'));

addListener(EVENT.REQUEST_SAVE_VIDEO, saveVideoManager.saveVideo.bind(saveVideoManager), $('#modal-container'));
addListener(EVENT.REQUEST_SEARCH_WITH_NEW_KEYWORD, searchVideoManager.searchWithNewKeyword.bind(searchVideoManager), $('#modal-container'));
addListener(EVENT.REQUEST_SEARCH_ON_SCROLL, searchVideoManager.searchOnScroll.bind(searchVideoManager), $('#modal-container'));


