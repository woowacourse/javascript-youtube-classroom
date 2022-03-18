import Save from '../domains/Save';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const videos = Save.instance.getVideos();

    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<my-video-item data-video-id="${video.id}"></my-video-item>`
      );
    });
  }
}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
