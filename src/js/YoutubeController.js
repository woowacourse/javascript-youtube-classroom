import { $ } from './utils/dom.js';
import NavigationView from './views/NavigationView.js';

export default class YoutubeController {
  constructor() {
    this.selectedTab = $('#saved-btn').element;
    this.navigationView = new NavigationView($('#nav-bar'));
  }

  init() {
    this.navigationView.on('clickNavTab', (e) => this.changeNavTab(e.detail));
  }

  changeNavTab(currentTab) {
    this.navigationView.toggleTabColor(this.selectedTab, currentTab);
    this.selectedTab = currentTab;
  }
}
