import { VALUE } from '../utils/constants.js';
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
    $('#hamburger-tab').setEvent('click', () => {
      this.emit('clickHamburgerTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#saved-tab').setEvent('click', () => {
      this.emit('clickSavedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#unwatched-tab').setEvent('click', () => {
      this.emit('clickUnWatchedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#watched-tab').setEvent('click', () => {
      this.emit('clickWatchedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#liked-tab').setEvent('click', () => {
      this.emit('clickLikedTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });

    $('#search-tab').setEvent('click', () => {
      this.emit('clickSearchTab');
      $('iframe').each((iframe) => stopVideo(iframe));
    });
  }

  toggleTabColor(currentTab) {
    $('.nav-btn').removeClass('bg-cyan-100');
    currentTab.addClass('bg-cyan-100');
  }

  toggleHamburger() {
    let delayTime = VALUE.HAMBURGER_DELAY_TIME;

    $('.hamburger-btn').removeClass('fadein');

    $('.hamburger-btn').each((botton) => {
      setTimeout(() => {
        botton.classList.toggle('d-none');
        botton.classList.add('fadein');
      }, delayTime);

      delayTime += VALUE.HAMBURGER_DELAY_TIME;
    });
  }
}
