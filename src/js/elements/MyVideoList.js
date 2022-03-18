import Save from '../domains/Save';
import TEMPLATE from '../templates';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  connectedCallback() {
    this.render();
    Save.instance.subscribe(this);
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const videos = Save.instance.getFilteredVideos(!this.id.includes('unwatched'));

    if (!videos.length) {
      this.innerHTML = TEMPLATE.generateNoVideo(
        !this.id.includes('unwatched')
          ? '아직 시청한 영상이 없습니다.'
          : '아직 저장된 영상이 없습니다.'
      );
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
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
