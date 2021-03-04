import { $ } from './utils/dom.js';
import { searchRequest } from '../js/request.js';
import NavigationView from './views/NavigationView.js';
import SearchModalView from './views/SearchModalView.js';
import Video from '../js/models/Video.js';

export default class YoutubeController {
  constructor() {
    this.videos = [];
    this.selectedTab = $('#saved-btn');
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.navigationView.on('clickNavTab', (e) => this.changeNavTab(e.detail));
    this.searchModalView.on('closeModal', () =>
      this.changeNavTab($('#saved-btn')),
    );
    this.searchModalView.on('submitSearch', (e) => this.searchVideo(e.detail));
  }

  changeNavTab(currentTab) {
    this.navigationView.toggleTabColor(this.selectedTab, currentTab);
    this.selectedTab = currentTab;

    if (currentTab.element.id === 'search-btn') {
      this.searchModalView.openModal();
    }
  }

  generateVideos(items) {
    this.videos = [
      ...items.map((item) => new Video(item.id.videoId, item.snippet)),
    ];
    this.searchModalView.renderVideoClips(this.videos);
  }

  searchVideo(keyword) {
    searchRequest(keyword, this.generateVideos.bind(this));
  }
}
