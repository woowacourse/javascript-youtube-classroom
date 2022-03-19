
import SearchVideoManager from './Manager/SearchVideoManager';
import SaveVideoManager from './Manager/SaveVideoManager';
import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import { addListener } from './util/event';
import { EVENT } from './constants';
import { $ } from './util';
import Storage from './Storage';

const homeView = new HomeView();
const searchModalView = new SearchModalView();

addListener(EVENT.UPDATE_SAVED_VIDEO_LIST, homeView.savedVideoListView.updateOnSavedVideoList, $('#app'));

addListener(EVENT.UPDATE_SEARCH_STATE, searchModalView.searchResultView.updateOnSearchState, $('#modal-container'));
addListener(EVENT.RESPONSE_SAVE_VIDEO, searchModalView.searchResultView.onResponseSaveVideo, $('#modal-container'));

const storage = new Storage();
const searchVideoManager = new SearchVideoManager({ storage });
const saveVideoManager = new SaveVideoManager({ storage });

addListener(EVENT.REQUEST_CHANGE_VIDEO_WATCHED_INFO, saveVideoManager.changeWatchedInfo, $('#app'));
addListener(EVENT.REQUEST_DELETE_VIDEO, saveVideoManager.deleteVideo, $('#app'));

addListener(EVENT.REQUEST_SAVE_VIDEO, saveVideoManager.saveVideo, $('#modal-container'));
addListener(EVENT.REQUEST_SEARCH_WITH_NEW_KEYWORD, searchVideoManager.searchWithNewKeyword, $('#modal-container'));
addListener(EVENT.REQUEST_SEARCH_ON_SCROLL, searchVideoManager.searchOnScroll, $('#modal-container'));


