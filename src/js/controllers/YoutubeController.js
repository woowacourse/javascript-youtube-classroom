import { $ } from '../utils/dom.js';
import { isEmptyArray } from '../utils/validator.js';
import {
  STORE_KEYS,
  ALERT_MESSAGES,
  SNACKBAR_MESSAGES,
  TAB,
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
    this.selectedTab = TAB.SELECTOR.SAVED;
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
      .on('clickHamburgerTab', () => this.navigationView.toggleHamburger())
      .on('clickNavTab', (e) => this.focusTab(e.detail))
      .on('clickSearchTab', () => this.focusSearchTab());
    this.searchModalView.on('closeModal', () => this.focusTab(TAB.ID.SAVED));
    this.savedVideosView
      .on('clickWatched', (e) => this.watchVideo(e.detail))
      .on('clickLike', (e) => this.likeVideo(e.detail))
      .on('clickDelete', (e) => this.deleteVideo(e.detail));
  }

  focusTab(id) {
    const taps = {
      [TAB.ID.SAVED]: {
        videoIds: this.store.state.savedVideoIds,
        selectTab: TAB.SELECTOR.SAVED,
      },
      [TAB.ID.UNWATCHED]: {
        videoIds: this.store.computed.unWatchedVideoIds,
        selectTab: TAB.SELECTOR.UNWATCHED,
      },
      [TAB.ID.WATCHED]: {
        videoIds: this.store.state.watchedVideoIds,
        selectTab: TAB.SELECTOR.WATCHED,
      },
      [TAB.ID.LIKED]: {
        videoIds: this.store.state.likedVideoIds,
        selectTab: TAB.SELECTOR.LIKED,
      },
    };

    const matchedVideoIds = taps[id].videoIds;

    this.updateNavTab(taps[id].selectTab);
    this.savedVideosView.showMatchedVideos(matchedVideoIds);

    if (isEmptyArray(matchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  focusSearchTab() {
    this.searchModalView.updateSavedCount(this.store.state.savedVideoIds);
    this.searchModalView.updateChips(this.store.state.recentKeywords);
    this.searchModalView.openModal();
    this.updateNavTab(TAB.SELECTOR.SEARCH);
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
        [STORE_KEYS.LIKED_VIDEO_IDS]: videoId,
      },
      isDelete,
    );
    this.savedVideosView.removeSavedVideoClip(videoId);
    popSnackbar(SNACKBAR_MESSAGES.DELETE_VIDEO.SUCCESS);

    this.checkVideoTapEmpty();
  }

  watchVideo(videoId) {
    const isWatchedTab = this.selectedTab === TAB.SELECTOR.WATCHED;
    const isUnWatchedTab = this.selectedTab === TAB.SELECTOR.UNWATCHED;

    this.store.update({ [STORE_KEYS.WATCHED_VIDEO_IDS]: videoId });
    this.savedVideosView.toggleWatchedButton(
      videoId,
      isWatchedTab || isUnWatchedTab,
    );

    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;

    if (watchedVideoIds.includes(videoId)) {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_ADD.SUCCESS);
    } else {
      popSnackbar(SNACKBAR_MESSAGES.WATCH_VIDEO_REMOVE.SUCCESS);
    }

    if (this.isNow(TAB.SELECTOR.UNWATCHED) && isEmptyArray(unWatchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }

    if (this.isNow(TAB.SELECTOR.WATCHED) && isEmptyArray(watchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  likeVideo(videoId) {
    const isLikedTab = this.selectedTab === TAB.SELECTOR.LIKED;

    this.store.update({ [STORE_KEYS.LIKED_VIDEO_IDS]: videoId });
    this.savedVideosView.toggleLikeButton(videoId, isLikedTab);

    const likedVideoIds = this.store.state.likedVideoIds;

    if (likedVideoIds.includes(videoId)) {
      popSnackbar(SNACKBAR_MESSAGES.LIKE_VIDEO_ADD.SUCCESS);
    } else {
      popSnackbar(SNACKBAR_MESSAGES.LIKE_VIDEO_REMOVE.SUCCESS);
    }

    if (this.isNow(TAB.SELECTOR.LIKED) && isEmptyArray(likedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  checkVideoTapEmpty() {
    const savedVideoIds = this.store.state.savedVideoIds;
    const watchedVideoIds = this.store.state.watchedVideoIds;
    const unWatchedVideoIds = this.store.computed.unWatchedVideoIds;
    const likedVideoIds = this.store.state.likedVideoIds;

    if (this.isNow(TAB.SELECTOR.SAVED) && isEmptyArray(savedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }

    if (this.isNow(TAB.SELECTOR.WATCHED) && isEmptyArray(watchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }

    if (this.isNow(TAB.SELECTOR.UNWATCHED) && isEmptyArray(unWatchedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }

    if (this.isNow(TAB.SELECTOR.LIKED) && isEmptyArray(likedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }

  isNow(tab) {
    return this.selectedTab === tab;
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = items.map((item) => new Video(item.id, item.snippet));
    const watchedVideos = this.store.state.watchedVideoIds;
    const likedVideos = this.store.state.likedVideoIds;

    this.savedVideosView.renderSavedVideoClips(
      savedVideos,
      watchedVideos,
      likedVideos,
    );
  }

  async initialLoad() {
    const savedVideoIds = this.store.state.savedVideoIds;
    const response = await videoRequest(savedVideoIds);

    if (!response) {
      popSnackbar(ALERT_MESSAGES.API_REQUEST_FAILED);
      return;
    }

    this.generateSavedVideos(response);
    this.savedVideosView.renderVideoEmptyImg();

    if (isEmptyArray(savedVideoIds)) {
      this.savedVideosView.showVideoEmptyImg();
    }
  }
}
