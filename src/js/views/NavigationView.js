import { $ } from '../utils/dom.js';
import View from './View.js';

export default class NavigationView extends View {
  constructor($element) {
    super($element);

    this.tabButtons = $('.nav-btn');
    this.bindTabEvents();
  }

  bindTabEvents() {
    this.tabButtons.setEvent('click', (e) => {
      this.emit('clickNavTab', $(`#${e.target.id}`));
    });
  }

  toggleTabColor(prevTab, currentTab) {
    prevTab.removeClass('bg-cyan-100');
    currentTab.addClass('bg-cyan-100');
  }
}
