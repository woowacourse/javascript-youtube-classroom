import template from '../ui/templates';

export default class MainPagePresenter {
  constructor() {
    this.$videoListContainer = document.querySelector('.video-list-grid');
  }

  renderVideoList(videos) {
    this.removeNoVideoImg(); // render
    this.$videoListContainer.insertAdjacentHTML(
      'beforeend',
      videos.map((item) => template.storageVideoItem(item)).join(''),
    ); //  render
    this.renderNoVideo(); //  render
  }

  removeNoVideoImg() {
    // render
    const noVideoImg = document.getElementById('no_video--img');
    if (noVideoImg) {
      noVideoImg.remove();
    }
  }

  renderNoVideo() {
    if (this.$videoListContainer.children.length === 0)
      document //  render
        .querySelector('#store-video-list')
        .insertAdjacentHTML('beforeend', template.noVideoList());
  }

  renderVideo(menuState, data) {
    // render
    this.$videoListContainer.replaceChildren();
    if (menuState === 'not-watched-tab-menu') {
      this.renderVideoList(data.notWachedVideoList);
      return;
    }
    if (menuState === 'watched-tab-menu') {
      this.renderVideoList(data.wachedVideoList);
      return;
    }
  }

  toggleTabChoosed(menuState, data) {
    document
      .querySelectorAll('.nav-tab__button')
      .forEach((element) => element.classList.toggle('choosed')); // render
    this.renderVideo(menuState, data);
  }

  appendList(item) {
    this.removeNoVideoImg();
    if (this.menuState === 'not-watched-tab-menu') {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.storageVideoItem(item),
      );
    }
  }
}
