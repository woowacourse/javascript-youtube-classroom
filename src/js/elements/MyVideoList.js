import Save from '../domains/Save';

import './MyVideoItem';

class MyVideoList extends HTMLUListElement {
  connectedCallback() {
    this.render();
    Save.instance.subscribe(this);
  }

  render() {
    const videos = Save.instance.getFilteredVideos(!this.id.includes('unwatched'));

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
