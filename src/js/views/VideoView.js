import { $, convertYYYYMMDD, intersectionObserver } from './utils.js';
import { YOUTUBE_API_REQUEST_COUNT, SELECTOR } from '../constants/index.js';

export default class VideoView {
  #io;
  #$container;
  #$emptyScreen;

  constructor(videoAPI) {
    this.#$container = $(SELECTOR.VIDEOS);
    this.#io = intersectionObserver(
      async () => {
        this.onSkeleton();
        const videos = await videoAPI();
        this.offSkeleton();
        this.#appendVideos(videos);
        return videos.length ? this.#lastVideoItem() : null;
      },
      { root: this.#$container }
    );
    this.#$emptyScreen = $(SELECTOR.EMPTY_SCREEN);
  }
  
  refreshVideoScreen() {
    this.#$container.innerHTML = '';
  }

  renderScreenByVideos(videos) {
    if (videos.length > 0) {
      this.#appendVideos(videos);
      this.#io.observe(this.#lastVideoItem());
      this.#controllScreen('remove');
    } else {
      this.#controllScreen('add');
    }
  }

  onSkeleton() {
    const html = (
      `<div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>`).repeat(YOUTUBE_API_REQUEST_COUNT);
    this.#$container.insertAdjacentHTML('beforeend', html);
  }

  offSkeleton() {
    this.#$container.querySelectorAll('.skeleton').forEach((node) => node.remove());
  }

  bindSaveVideo(handler) {
    this.#$container.addEventListener('click', (e) => {
      const videoId = e.target.dataset.videoId;

      if (videoId) {
        handler(videoId);
        e.target.classList.add('saved');
      }
    })   
  }

  #appendVideos(videos) {
    const html = videos.map(
      ({ id, snippet }) =>
        `<li class="video-item">
          <img
            src="${snippet.thumbnails.default.url}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">[Playlist] ${snippet.title}</h4>
          <p class="video-item__channel-name">${snippet.channelTitle}</p>
          <p class="video-item__published-date">${convertYYYYMMDD(snippet.publishTime)}</p>
          <button data-video-id="${id.videoId}" class="video-item__save-button button">⬇ 저장</button>
        </li>`
    ).join('');
    this.#$container.insertAdjacentHTML('beforeend', html);
  }

  #controllScreen(order) {
    this.#$emptyScreen.classList[order]('empty');
  }

  #lastVideoItem() {
    return this.#$container.lastChild;
  }
}
