import MyVideoStore from '../stores/MyVideoStore';
import { EMPTY_MY_VIDEOS } from '../templates';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  constructor() {
    super();
    this.render();
    MyVideoStore.instance.subscribe(this);
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    if (MyVideoStore.instance.getVideos().length === 0) {
      this.innerHTML = EMPTY_MY_VIDEOS;

      return;
    }

    const targetMenu = this.dataset.menu;
    const videos =
      targetMenu === 'watched'
        ? MyVideoStore.instance.getWatchedVideos()
        : MyVideoStore.instance.getPlaylistVideos();

    this.innerHTML = '';

    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-menu="${targetMenu}" data-id=${video.details.id}></my-video-item>`
      );
    });
  }

  notify() {
    this.render();
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
