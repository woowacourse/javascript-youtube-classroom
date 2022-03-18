import MyVideoStore from '../stores/MyVideoStore';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  constructor() {
    super();
    this.render();
    MyVideoStore.instance.subscribe(this);
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const selectedMenu = this.dataset.menu;
    let videos = MyVideoStore.instance.getPlaylistVideos();

    if (selectedMenu === 'watched') {
      videos = MyVideoStore.instance.getWatchedVideos();
    }

    this.innerHTML = '';

    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-id=${video.details.id}></my-video-item>`
      );
    });
  }

  notify(data) {
    this.render();
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
