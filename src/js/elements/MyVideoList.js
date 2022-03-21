import MyVideoStore from '../stores/MyVideoStore';
import { $, $$ } from '../utils';
import { EMPTY_MY_VIDEOS } from '../templates';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  constructor() {
    super();
    this.render();
    MyVideoStore.instance.subscribe(this);
  }

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
    const myStoreVideoIds = videos.map((video) => video.details.id);

    this.addVideoItems(targetMenu, myStoreVideoIds);
    this.removeVideoItem(targetMenu, myStoreVideoIds);
  }

  addVideoItems(targetMenu, myStoreVideoIds) {
    const myVideoitemIds = $$('my-video-item', $(`.${targetMenu}-videos-container`)).map(
      (item) => item.dataset.id
    );
    const targetVideoIds = myStoreVideoIds.filter((id) => !myVideoitemIds.includes(id));

    targetVideoIds.forEach((id) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-menu="${targetMenu}" data-id=${id}></my-video-item>`
      );
    });
  }

  removeVideoItem(targetMenu, myStoreVideoIds) {
    const myVideoitemIds = $$('my-video-item', $(`.${targetMenu}-videos-container`)).map(
      (item) => item.dataset.id
    );
    const targetVideoId = myVideoitemIds.find((id) => !myStoreVideoIds.includes(id));

    if (!targetVideoId) return;

    $(`[data-id="${targetVideoId}"]`, $(`.${targetMenu}-videos-container`)).remove();
  }

  notify() {
    this.render();
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
