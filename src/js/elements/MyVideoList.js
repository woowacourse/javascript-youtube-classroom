import MyVideoStore from '../stores/MyVideoStore';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  constructor() {
    super();
    const selectedMenu = this.dataset.menu;
    let videos = MyVideoStore.instance.getVideos();

    if (selectedMenu === 'watched') {
      videos = MyVideoStore.instance.getWatchedVideos();
    }

    this.render(videos);
    MyVideoStore.instance.subscribe(this);
  }

  render(videos) {
    this.innerHTML = '';

    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-id=${video.details.id}></my-video-item>`
      );
    });
  }

  notify(data) {
    this.render(data);
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
