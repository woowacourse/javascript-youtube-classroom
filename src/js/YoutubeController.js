import { $ } from './utils/dom.js';
import {
  getValidJson,
  setRecentChip,
  setSavedVideoId,
} from './utils/localStorage.js';
import { isEmptySearchKeyword } from './utils/validator.js';
import { ALERT_MESSAGES, STORAGE_KEYS } from './utils/constants.js';
import { searchRequest, videoRequest } from '../js/request.js';
import NavigationView from './views/NavigationView.js';
import SearchModalView from './views/SearchModalView.js';
import SavedVideosView from './views/SavedVideosView.js';
import Video from '../js/models/Video.js';

export default class YoutubeController {
  constructor() {
    this.videos = [];
    this.nextPageToken;
    this.selectedTab = $('#saved-btn');
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
    this.savedVideosView = new SavedVideosView($('#main-videos'));
  }

  init() {
    this.bindEvents();
    this.loadSavedVideos();
  }

  bindEvents() {
    this.navigationView
      .on('clickSaveTab', () => this.focusSavedTab())
      .on('clickWatchedTab', () => this.focusWatchedTab())
      .on('clickSearchTab', () => this.focusSearchTab());
    this.searchModalView
      .on('openModal', (e) => this.searchVideo(e.detail))
      .on('submitSearch', (e) => this.searchVideo(e.detail))
      .on('scrollResult', (e) => this.scrollVideo(e.detail))
      .on('clickSaveButton', (e) => this.saveVideo(e.detail))
      .on('clickChip', (e) => this.searchVideo(e.detail))
      .on('closeModal', () => this.changeNavTab());
  }

  focusSavedTab() {
    // TODO: saved tab 이동 시 기능 구현
    this.changeNavTab($('#saved-btn'));
  }

  focusWatchedTab() {
    // TODO: watched tab 이동 시 기능 구현
    this.changeNavTab($('#watched-btn'));
  }

  focusSearchTab() {
    this.searchModalView.openModal();
    this.changeNavTab($('#search-btn'));
  }

  changeNavTab(currentTab = $('#saved-btn')) {
    this.navigationView.toggleTabColor(this.selectedTab, currentTab);
    this.selectedTab = currentTab;
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = [
      ...items.map((item) => new Video(item.id, item.snippet)),
    ];

    this.savedVideosView.renderSavedVideoClips(savedVideos);
  }

  async loadSavedVideos() {
    const savedVideoIds = getValidJson(STORAGE_KEYS.SAVED_VIDEO_IDS, []);

    if (savedVideoIds.length === 0) {
      this.savedVideosView.showNoVideos();
      return;
    }

    const response = await videoRequest(savedVideoIds);
    this.generateSavedVideos(response);
  }

  generateVideos(response) {
    const { prevPageToken, nextPageToken, items } = response;

    if (items.length === 0 && !prevPageToken) {
      this.searchModalView.showNoResult();
      return;
    }

    this.nextPageToken = nextPageToken;
    const newVideos = [
      ...items.map((item) => new Video(item.id.videoId, item.snippet)),
    ];
    this.videos = [...this.videos, ...newVideos];

    this.searchModalView.renderVideoClips(newVideos);
  }

  async scrollVideo(keyword) {
    this.searchModalView.startSearch();

    const response = await searchRequest(keyword, this.nextPageToken);
    this.generateVideos(response);
  }

  async searchVideo(keyword) {
    this.nextPageToken = null;

    if (isEmptySearchKeyword(keyword)) {
      alert(ALERT_MESSAGES.EMPTY_SEARCH_KEYWORD);
      return;
    }

    const recentKeywords = getValidJson(STORAGE_KEYS.RECENT_KEYWORDS, []);

    setRecentChip(keyword);
    this.searchModalView.updateChips(recentKeywords);
    this.searchModalView.clearVideoClips();
    this.searchModalView.startSearch();
    this.searchModalView.scrollToTop();

    const response = await searchRequest(keyword, this.nextPageToken);
    this.generateVideos(response);
  }

  saveVideo(videoId) {
    const videoToSave = this.videos.find((video) => video.id === videoId);

    this.savedVideosView.addSavedVideoClip(videoToSave);
    setSavedVideoId(videoId);
  }
}
