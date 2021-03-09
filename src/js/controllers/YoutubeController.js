import { $ } from '../utils/dom.js';
import { videoRequest } from '../request.js';
import NavigationView from '../views/NavigationView.js';
import SearchModalView from '../views/SearchModalView.js';
import SavedVideosView from '../views/SavedVideosView.js';
import Video from '../models/Video.js';

export default class YoutubeController {
  constructor(store) {
    this.store = store;
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
    this.savedVideosView = new SavedVideosView($('#main-videos'));
  }

  init() {
    this.navigationView.init();
    this.searchModalView.init();

    this.bindEvents();
    this.loadSavedVideos();
  }

  bindEvents() {
    this.navigationView
      .on('clickSavedTab', () => this.focusSavedTab())
      .on('clickWatchedTab', () => this.focusWatchedTab())
      .on('clickSearchTab', () => this.focusSearchTab());

    this.searchModalView.on('closeModal', () => this.focusSavedTab());
  }

  update() {
    this.navigationView.toggleTabColor(this.store.state.selectedTab);
  }

  focusSavedTab() {
    // TODO: saved tab 이동 시 기능 구현
    this.store.update({ selectedTab: $('#saved-btn') });
  }

  focusWatchedTab() {
    // TODO: watched tab 이동 시 기능 구현
    this.store.update({ selectedTab: $('#watched-btn') });
  }

  focusSearchTab() {
    this.searchModalView.updateSavedCount(this.store.state.savedVideoIds);
    this.searchModalView.updateChips(this.store.state.recentKeywords);
    this.searchModalView.openModal();

    this.store.update({ selectedTab: $('#search-btn') });
  }

  generateSavedVideos(response) {
    const { items } = response;

    const savedVideos = [
      ...items.map((item) => new Video(item.id, item.snippet)),
    ];

    this.savedVideosView.renderSavedVideoClips(savedVideos);
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
