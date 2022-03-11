import { $, convertYYYYMMDD, intersectionObserver } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class VideoView {
  #io;
  #$container;
  #$emptyScreen;

  constructor(videoAPI) {
    this.#$container = $(SELECTOR.VIDEOS);
    this.#io = intersectionObserver(
      async () => {
        const videos = await videoAPI();
        this.#appendVideos(videos);

        return videos.length ? this.#lastVideoItem() : null;
      },
      { root: this.#$container }
    );
    this.#$emptyScreen = $('#empty-screen');
  }

  renderScreenByVideos(videos) {
    if (videos.length > 0) {
      this.#refreshVideoScreen();
      this.#appendVideos(videos);
      this.#io.observe(this.#lastVideoItem());
      this.#controllScreen('remove');
    } else {
      this.#controllScreen('add');
    }
  }

  #appendVideos(videos) {
    const html = videos.map(
      ({ id, snippet }) =>
        `<li class="video-item" data-video-id="${id.videoId}">
          <img
            src="${snippet.thumbnails.default.url}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">[Playlist] ${snippet.title}</h4>
          <p class="video-item__channel-name">${snippet.channelTitle}</p>
          <p class="video-item__published-date">${convertYYYYMMDD(snippet.publishTime)}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>`
    ).join('');
    this.#$container.insertAdjacentHTML('beforeend', html);
  }

  #controllScreen(order) {
    this.#$emptyScreen.classList[order]('empty');
  }

  #refreshVideoScreen() {
    this.#$container.innerHTML = '';
  }

  #lastVideoItem() {
    return this.#$container.lastChild;
  }
}
