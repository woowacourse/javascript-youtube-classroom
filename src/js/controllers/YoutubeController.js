import { $ } from '../utils/dom.js';
import { isEmptyArray } from '../utils/validator.js';
import {
  TABS,
  STORE_KEYS,
  BUTTON_PACK_TYPE,
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
    this.selectedTab = TABS.SAVED;
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

  update() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;
    const likedVideoIds = this.store.state.likedVideoIds;

    const isEmptySavedTab =
      this.selectedTab === TABS.SAVED && isEmptyArray(unWatchedVideoIds);
    const isEmptyWatchedTab =
      this.selectedTab === TABS.WATCHED && isEmptyArray(watchedVideoIds);
    const isEmptyLikedTab =
      this.selectedTab === TABS.LIKED && isEmptyArray(likedVideoIds);

    if (isEmptySavedTab || isEmptyWatchedTab || isEmptyLikedTab) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  bindEvents() {
    this.navigationView
      .on('clickSavedTab', () => this.focusSavedTab())
      .on('clickWatchedTab', () => this.focusWatchedTab())
      .on('clickLikedTab', () => this.focusLikedTab())
      .on('clickSearchTab', () => this.focusSearchTab());
    this.searchModalView.on('closeModal', () => this.focusSavedTab());
    this.savedVideosView
      .on('clickWatched', (e) => this.markVideoWatched(e.detail))
      .on('clickLike', (e) => this.markVideoLiked(e.detail))
      .on('clickDelete', (e) => this.deleteVideo(e.detail));
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

  focusSavedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.updateNavTab(TABS.SAVED);
    this.savedVideosView.showMatchedVideos(watchedVideoIds, unWatchedVideoIds);

    if (isEmptyArray(unWatchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  focusWatchedTab() {
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    this.updateNavTab(TABS.WATCHED);
    this.savedVideosView.showMatchedVideos(unWatchedVideoIds, watchedVideoIds);

    if (isEmptyArray(watchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  focusLikedTab() {
    const savedVideoIds = this.store.state.savedVideoIds;
    const likedVideoIds = this.store.state.likedVideoIds;

    this.updateNavTab(TABS.LIKED);
    this.savedVideosView.showMatchedVideos(savedVideoIds, likedVideoIds);

    if (isEmptyArray(likedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  focusSearchTab() {
    this.searchModalView.updateSavedCount(this.store.state.savedVideoIds);
    this.searchModalView.updateChips(this.store.state.recentKeywords);
    this.searchModalView.openModal();
    this.updateNavTab(TABS.SEARCH);
  }

  updateNavTab(currentTab) {
    this.selectedTab = currentTab;
    this.navigationView.toggleTabColor(currentTab);
  }

  deleteVideo(videoId) {
    if (!confirm(ALERT_MESSAGES.CONFIRM_DELETE_VIDEO)) return;

    const isDelete = true;

    this.store.update(
      {
        [STORE_KEYS.SAVED_VIDEO_IDS]: videoId,
        [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId,
      },
      isDelete,
    );
    this.savedVideosView.removeSavedVideoClip(videoId);
    popSnackbar(SNACKBAR_MESSAGES.DELETE_VIDEO.SUCCESS);
  }

  markVideoWatched(videoId) {
    this.store.update({ [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId });

    if (this.selectedTab === TABS.SAVED) {
      this.savedVideosView.toggleButton(videoId, BUTTON_PACK_TYPE.WATCHED);
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_ADD.SUCCESS);
    } else if (this.selectedTab === TABS.WATCHED) {
      this.savedVideosView.toggleButton(videoId, BUTTON_PACK_TYPE.WATCHED);
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_REMOVE.SUCCESS);
    } else if (this.selectedTab === TABS.LIKED) {
      const isPop = false;
      this.savedVideosView.toggleButton(
        videoId,
        BUTTON_PACK_TYPE.WATCHED,
        isPop,
      );
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_ADD.SUCCESS);
    }
  }

  markVideoLiked(videoId) {
    this.store.update({ [STORE_KEYS.LIKED_VIDEO_IDS]: videoId });
    const likedVideoIds = this.store.state.likedVideoIds;

    if (this.selectedTab === TABS.SAVED || this.selectedTab === TABS.WATCHED) {
      const isPop = false;
      this.savedVideosView.toggleButton(videoId, BUTTON_PACK_TYPE.LIKE, isPop);
      if (likedVideoIds.includes(videoId)) {
        popSnackbar(SNACKBAR_MESSAGES.LIKE_VIDEO_ADD.SUCCESS);
      } else {
        popSnackbar(SNACKBAR_MESSAGES.LIKE_VIDEO_REMOVE.SUCCESS);
      }
    } else if (this.selectedTab === TABS.LIKED) {
      this.savedVideosView.toggleButton(videoId, BUTTON_PACK_TYPE.LIKE);
      popSnackbar(SNACKBAR_MESSAGES.LIKE_VIDEO_REMOVE.SUCCESS);
    }
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = items.map((item) => new Video(item.id, item.snippet));
    const watchedVideos = this.store.state.watchedVideoIds;

    this.savedVideosView.renderSavedVideoClips(savedVideos, watchedVideos);
  }
}
