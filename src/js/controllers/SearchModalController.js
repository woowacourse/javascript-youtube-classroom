import { $ } from '../utils/dom.js';
import { isEmptySearchKeyword, isEmptyArray } from '../utils/validator.js';
import {
  VALUE,
  ALERT_MESSAGES,
  STORE_KEYS,
  SNACKBAR_MESSAGES,
} from '../utils/constants.js';
import popSnackbar from '../utils/snackbar.js';
import NavigationView from '../views/NavigationView.js';
import SearchModalView from '../views/SearchModalView.js';
import SavedVideosView from '../views/SavedVideosView.js';
import Video from '../models/Video.js';
import { searchRequest } from '../request.js';

export default class SearchModalController {
  constructor(store) {
    this.store = store;
    this.videos = [];
    this.nextPageToken;
    this.keyword;
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
    this.savedVideosView = new SavedVideosView($('#main-videos'));
  }

  init() {
    this.bindEvents();
  }

  update() {
    this.searchModalView.updateChips(this.store.state.recentKeywords);
    this.searchModalView.updateSavedCount(this.store.state.savedVideoIds);
  }

  bindEvents() {
    this.searchModalView
      .on('openModal', (e) => this.searchVideo(e.detail))
      .on('submitSearch', (e) => this.searchVideo(e.detail))
      .on('scrollResult', (e) => this.scrollVideo(e.detail))
      .on('clickSaveButton', (e) => this.saveVideo(e.detail))
      .on('clickChip', (e) => this.searchVideo(e.detail));
  }

  generateVideos(response) {
    const { prevPageToken, nextPageToken, items } = response;

    if (isEmptyArray(items) && !prevPageToken) {
      this.searchModalView.showNoResult();
      return;
    }

    this.nextPageToken = nextPageToken;
    const newVideos = items.map(
      (item) => new Video(item.id.videoId, item.snippet),
    );
    this.videos = [...this.videos, ...newVideos];

    this.searchModalView.renderVideoClips(
      newVideos,
      this.store.state.savedVideoIds,
    );
  }

  async scrollVideo() {
    this.searchModalView.renderSkeletonTemplate();

    const response = await searchRequest(this.keyword, this.nextPageToken);
    if (!response) {
      popSnackbar(API_REQUEST_FAILED.API_REQUEST_FAILED);
      return;
    }

    this.generateVideos(response);
  }

  async searchVideo(keyword) {
    if (isEmptySearchKeyword(keyword)) {
      alert(ALERT_MESSAGES.EMPTY_SEARCH_KEYWORD);
      return;
    }

    this.keyword = keyword;
    this.nextPageToken = null;
    this.store.update({ [STORE_KEYS.RECENT_KEYWORDS]: keyword });

    this.searchModalView.clearVideoClips();
    this.searchModalView.renderSkeletonTemplate();
    this.searchModalView.scrollToTop();

    const response = await searchRequest(keyword, this.nextPageToken);
    if (!response) {
      popSnackbar(ALERT_MESSAGES.API_REQUEST_FAILED);
      return;
    }

    this.generateVideos(response);
  }

  saveVideo(target) {
    const videoId = target.dataset.videoSave;
    const savedVideoIds = this.store.state.savedVideoIds;

    if (savedVideoIds.length === VALUE.MAX_SAVED_COUNT) {
      alert(ALERT_MESSAGES.OVER_SAVED_VIDEO_COUNT);
      popSnackbar(SNACKBAR_MESSAGES.SAVE_VIDEO.FAIL);
      return;
    }

    this.store.update({ [STORE_KEYS.SAVED_VIDEO_IDS]: videoId });

    const videoToSave = this.videos.find((video) => video.id === videoId);
    this.savedVideosView.addSavedVideoClip(videoToSave);
    this.searchModalView.disableSaveButton(target);
    popSnackbar(SNACKBAR_MESSAGES.SAVE_VIDEO.SUCCESS);
  }
}
