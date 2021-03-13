import { $ } from '../utils/dom.js';
import { isEmptyArray } from '../utils/validator.js';
import {
  STORE_KEYS,
  ALERT_MESSAGES,
  SNACKBAR_MESSAGES,
} from '../utils/constants.js';
import popSnackbar from '../utils/snackbar.js';
import { videoRequest } from '../request.js';
import NavigationView from '../views/NavigationView.js';
import SearchModalView from '../views/SearchModalView.js';
import SavedVideosView from '../views/SavedVideosView.js';
import Video from '../models/Video.js';

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

    this.initialLoad();
    this.bindEvents();
  }

  bindEvents() {
    this.navigationView
      .on('clickSavedTab', () => this.focusSavedTab())
      .on('clickWatchedTab', () => this.focusWatchedTab())
      .on('clickSearchTab', () => this.focusSearchTab());
    this.searchModalView.on('closeModal', () => this.focusSavedTab());
    this.savedVideosView
      .on('clickWatched', (e) => this.markVideoWatched(e.detail))
      .on('clickDelete', (e) => this.deleteVideo(e.detail));
  }

  focusSavedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.updateNavTab($('#saved-btn'));
    this.savedVideosView.showMatchedVideos(watchedVideoIds, unWatchedVideoIds);

    if (isEmptyArray(unWatchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  focusWatchedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.updateNavTab($('#watched-btn'));
    this.savedVideosView.showMatchedVideos(unWatchedVideoIds, watchedVideoIds);

    if (isEmptyArray(watchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
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

  deleteVideo(videoId) {
    if (!confirm(ALERT_MESSAGES.CONFIRM_DELETE_VIDEO)) return;

    const isDelete = true;
    const isFromSavedTab = this.store.computed.unWatchedVideoIds.includes(
      videoId,
    );

    this.store.update(
      {
        [STORE_KEYS.SAVED_VIDEO_IDS]: videoId,
        [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId,
      },
      isDelete,
    );
    this.savedVideosView.removeSavedVideoClip(videoId);
    popSnackbar(SNACKBAR_MESSAGES.DELETE_VIDEO.SUCCESS);

    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;
    const watchedVideoIds = this.store.state.watchedVideoIds;

    if (isFromSavedTab) {
      if (isEmptyArray(unWatchedVideoIds)) {
        this.savedVideosView.showVideoEmptyImg();
      }
    } else {
      if (isEmptyArray(watchedVideoIds)) {
        this.savedVideosView.showVideoEmptyImg();
      }
    }
  }

  markVideoWatched(videoId) {
    this.store.update({ [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId });
    this.savedVideosView.toggleWatchedButton(videoId);

    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;
    const isFromSavedTab = unWatchedVideoIds.includes(videoId);

    if (isFromSavedTab) {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_REMOVE.SUCCESS);
      if (isEmptyArray(watchedVideoIds)) {
        this.savedVideosView.showVideoEmptyImg();
      }
    } else {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_ADD.SUCCESS);
      if (isEmptyArray(unWatchedVideoIds)) {
        this.savedVideosView.showVideoEmptyImg();
      }
    }
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = items.map((item) => new Video(item.id, item.snippet));
    const watchedVideos = this.store.state.watchedVideoIds;

    this.savedVideosView.renderSavedVideoClips(savedVideos, watchedVideos);
  }

  async initialLoad() {
    const savedVideoIds = this.store.state.savedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;
    const response = await videoRequest(savedVideoIds);
    if (!response) {
      popSnackbar(ALERT_MESSAGES.API_REQUEST_FAILED);
      return;
    }

    this.generateSavedVideos(response);
    this.savedVideosView.renderVideoEmptyImg();

    if (isEmptyArray(unWatchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }
}
