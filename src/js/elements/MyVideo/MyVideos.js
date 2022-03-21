import CustomElement from '../../abstract/CustomElement';

import './MyVideoList';

class MyVideos extends CustomElement {
  template() {
    return `
      <section class="playlist-videos-container">
        <ul is="my-video-list" data-menu="playlist"></ul>
      </section>
      <section class="watched-videos-container hidden">
        <ul is="my-video-list" data-menu="watched"></ul>
      </section>
    `;
  }
}

customElements.define('my-videos', MyVideos);

export default MyVideos;
