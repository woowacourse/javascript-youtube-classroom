import { $ } from '../utils/dom.js';
import stopVideo from '../utils/stopVideo.js';
import View from './View.js';

export default class NavigationView extends View {
  constructor($element) {
    super($element);
  }

  init() {
    this.bindTabEvents();
  }

  bindTabEvents() {
    const customEvents = {
      'saved-btn': 'clickSavedTab',
      'watched-btn': 'clickWatchedTab',
      'liked-btn': 'clickLikedTab',
      'search-btn': 'clickSearchTab',
    };

    $('.nav-btn').each((tab) => {
      $(`#${tab.id}`).setEvent('click', () => {
        this.emit(customEvents[tab.id]);
        $('iframe').each((iframe) => stopVideo(iframe));
      });
    });
  }

  toggleTabColor(currentTab) {
    $('.nav-btn').removeClass('bg-cyan-100');
    currentTab.addClass('bg-cyan-100');
  }
}
