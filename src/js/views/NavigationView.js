import { $ } from '../utils/dom.js';
import View from './View.js';

export default class NavigationView extends View {
  constructor($element) {
    super($element);

    this.tabButtons = $('.nav-btn');
  }

  init() {
    this.bindTabEvents();
  }

  bindTabEvents() {
    $('#saved-btn').setEvent('click', () => {
      this.emit('clickSavedTab');
    });

    $('#watched-btn').setEvent('click', () => {
      this.emit('clickWatchedTab');
    });

    $('#search-btn').setEvent('click', () => {
      this.emit('clickSearchTab');
    });
  }

  toggleTabColor(currentTab) {
    $('.nav-btn').removeClass('bg-cyan-100');
    currentTab.addClass('bg-cyan-100');
  }
}
