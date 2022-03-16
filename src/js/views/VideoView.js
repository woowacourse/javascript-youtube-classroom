import { $, intersectionObserver } from './utils.js';
import { YOUTUBE_API_REQUEST_COUNT, SELECTOR } from '../constants/index.js';

export default class VideoView {
  #io;
  #videoAPI;
  #$container;
  #$emptyScreen;

  constructor(videoAPI) {
    this.#$container = $(SELECTOR.VIDEOS);
    this.#videoAPI = videoAPI;
    this.#io = intersectionObserver(this.#findObserverElement.bind(this), { root: this.#$container });
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
    const html = `<div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>`.repeat(YOUTUBE_API_REQUEST_COUNT);
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
    });
  }

  async #findObserverElement() {
    this.onSkeleton();
    const videos = await this.#videoAPI();
    this.offSkeleton();
    this.#appendVideos(videos);
    return videos.length ? this.#lastVideoItem() : null;
  }

  #appendVideos(videos) {
    const html = videos
      .map(
        (video) =>
          `<li class="video-item">
        <img
          src="${video.thumbnail}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">[Playlist] ${video.title}</h4>
        <p class="video-item__channel-name">${video.channelTitle}</p>
        <p class="video-item__published-date">${video.date}</p>
        <button data-video-id="${video.id}" class="video-item__save-button button ${video.saved ? 'saved' : ''}" type="button">⬇ 저장</button>
      </li>`
      )
      .join('');
    this.#$container.insertAdjacentHTML('beforeend', html);
  }

  #controllScreen(order) {
    this.#$emptyScreen.classList[order]('empty');
  }

  #lastVideoItem() {
    return this.#$container.lastChild;
  }
}
