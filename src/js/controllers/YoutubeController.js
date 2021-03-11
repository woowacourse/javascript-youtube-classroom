import { $ } from '../utils/dom.js';
import {
  STORE_KEYS,
  PACK_BUTTON_TYPE,
  ALERT_MESSAGES,
  SNACKBAR_MESSAGES,
} from '../utils/constants.js';
import { videoRequest } from '../request.js';
import NavigationView from '../views/NavigationView.js';
import SearchModalView from '../views/SearchModalView.js';
import SavedVideosView from '../views/SavedVideosView.js';
import Video from '../models/Video.js';
import popSnackbar from '../utils/snackbar.js';

export default class YoutubeController {
  constructor(store) {
    this.store = store;
    this.selectedTab = $('#saved-btn');
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
    this.savedVideosView = new SavedVideosView($('#main-videos'));
  }

  init() {
    this.navigationView.init();
    this.searchModalView.init();
    this.savedVideosView.init();

    this.bindEvents();
    this.loadSavedVideos();
  }

  bindEvents() {
    this.navigationView
      .on('clickSavedTab', () => this.focusSavedTab())
      .on('clickWatchedTab', () => this.focusWatchedTab())
      .on('clickSearchTab', () => this.focusSearchTab());
    this.searchModalView.on('closeModal', () => this.focusSavedTab());
    this.savedVideosView
      .on('clickWatched', (e) => this.watchVideo(e.detail))
      .on('clickDelete', (e) => this.deleteVideo(e.detail));
  }

  deleteVideo(videoId) {
    const isDelete = true;

    if (confirm(ALERT_MESSAGES.CONFIRM_DELETE_VIDEO)) {
      this.store.update({ [STORE_KEYS.SAVED_VIDEO_IDS]: videoId }, isDelete);
      this.savedVideosView.removeSavedVideoClip(videoId);
      popSnackbar(SNACKBAR_MESSAGES.DELETE_VIDEO.SUCCESS);
    }
  }

  watchVideo(videoId) {
    this.store.update({ [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId });
    this.savedVideosView.toggleWatchedButton(videoId);

    if (this.store.state.watchedVideoIds.includes(videoId)) {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_ADD.SUCCESS);
    } else {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_REMOVE.SUCCESS);
    }
  }

  focusSavedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.savedVideosView.showMatchedVideos(watchedVideoIds, unWatchedVideoIds);
    this.updateNavTab($('#saved-btn'));
  }

  focusWatchedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.savedVideosView.showMatchedVideos(unWatchedVideoIds, watchedVideoIds);
    this.updateNavTab($('#watched-btn'));
  }

  focusSearchTab() {
    this.searchModalView.updateSavedCount(this.store.state.savedVideoIds);
    this.searchModalView.updateChips(this.store.state.recentKeywords);
    this.searchModalView.openModal();
    this.updateNavTab($('#search-btn'));
  }

  updateNavTab(currentTab) {
    this.selectedTab = currentTab;
    this.navigationView.toggleTabColor(currentTab);
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = [
      ...items.map((item) => new Video(item.id, item.snippet)),
    ];
    const watchedVideos = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.savedVideosView.renderSavedVideoClips(savedVideos, watchedVideos);
  }

  async loadSavedVideos() {
    const savedVideoIds = this.store.state.savedVideoIds;

    if (savedVideoIds.length === 0) {
      this.savedVideosView.showNoVideos();
      return;
    }

    const response = await videoRequest(savedVideoIds);
    this.generateSavedVideos(response);
  }
}
