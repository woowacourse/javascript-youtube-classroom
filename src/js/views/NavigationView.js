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
    $('#saved-btn').setEvent('click', () => {
      this.emit('clickSavedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#watched-btn').setEvent('click', () => {
      this.emit('clickWatchedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#search-btn').setEvent('click', () => {
      this.emit('clickSearchTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });
  }

  toggleTabColor(currentTab) {
    $('.nav-btn').removeClass('bg-cyan-100');
    currentTab.addClass('bg-cyan-100');
  }
}
