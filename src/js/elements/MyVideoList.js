import TEMPLATE from '../templates';
import SavedVideo from '../stores/SavedVideo';
import { INFO_MESSAGE } from '../constants';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  connectedCallback() {
    this.render();
    SavedVideo.instance.subscribe(this);
  }

  render() {
    const isWatchedList = !this.id.includes('unwatched');
    const videos = SavedVideo.instance.filterVideos(isWatchedList);

    if (!videos.length) {
      this.showNoVideo(isWatchedList);
    }

    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-video-id="${video.id}"></my-video-item>`
      );
    });
  }

  notify() {
    this.textContent = '';
    this.render();
  }

  showNoVideo(isWatchedList) {
    this.innerHTML = TEMPLATE.generateNoVideo(
      isWatchedList ? INFO_MESSAGE.NO_WATCHED_VIDEO : INFO_MESSAGE.NO_WATCHED_VIDEO
    );
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
