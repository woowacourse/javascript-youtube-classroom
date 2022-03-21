import { MENU_STATE } from '../constant';
import template from './templates';

class MainPagePresenter {
  constructor() {
    this.$videoListContainer = document.querySelector('.video-list-grid');
    this.menuState = MENU_STATE.NOT_WATCHED_MENU;
  }

  renderVideoList(videos) {
    this.removeNoVideoImg();
    this.$videoListContainer.insertAdjacentHTML(
      'beforeend',
      videos.map((item) => template.storageVideoItem(item)).join(''),
    );
    this.renderNoVideo();
  }

  removeNoVideoImg() {
    const noVideoImg = document.getElementById('no_video--img');
    if (noVideoImg) {
      noVideoImg.remove();
    }
  }

  renderNoVideo() {
    if (this.$videoListContainer.children.length === 0)
      document
        .querySelector('#store-video-list')
        .insertAdjacentHTML('beforeend', template.noVideoList());
  }

  renderVideo(menuState, data) {
    this.$videoListContainer.replaceChildren();
    if (menuState === MENU_STATE.NOT_WATCHED_MENU) {
      this.renderVideoList(data.notWachedVideoList);
      return;
    }
    if (menuState === MENU_STATE.WATCHED_MENU) {
      this.renderVideoList(data.wachedVideoList);
      return;
    }
  }

  toggleTabChoosed(menuState, data) {
    this.menuState = menuState;
    document
      .querySelectorAll('.nav-tab__button')
      .forEach((element) => element.classList.toggle('choosed'));
    this.renderVideo(menuState, data);
  }

  appendList(item) {
    this.removeNoVideoImg();
    if (this.menuState === MENU_STATE.NOT_WATCHED_MENU) {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.storageVideoItem(item),
      );
    }
  }
}

export const mainPagePresenter = new MainPagePresenter();
