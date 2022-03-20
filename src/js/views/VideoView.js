import { $, intersectionObserver } from '../utils/index.js';
import { YOUTUBE_API_REQUEST_COUNT, SELECTOR } from '../constants/index.js';
import { _ } from '../utils/fx.js';

export default class VideoView {
  #$container;

  #io;

  #$emptyScreen;

  #$firstSkeleton;

  constructor(videoAPI) {
    this.#$container = $(SELECTOR.VIDEOS);
    this.#io = intersectionObserver(
      () => {
        this.onSkeleton();

        return _.go(videoAPI(), (videos) => {
          this.#appendVideos(videos);
          this.offSkeleton();

          return this.#lastVideoItem();
        });
      },
      { root: this.#$container },
    );
    this.#$emptyScreen = $(SELECTOR.EMPTY_SCREEN);
    this.#initializeFirstSkeleton();
  }

  refreshVideoScreen() {
    while (this.#$container.firstChild.classList[0] === 'video-item') {
      this.#$container.firstChild.remove();
    }
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
    this.#controllSkeleton('add');
  }

  offSkeleton() {
    this.#controllSkeleton('remove');
  }

  bindSaveVideo(handler) {
    this.#$container.addEventListener('click', (e) => {
      if (e.target.dataset.videoId) {
        handler({ ...e.target.dataset });
        e.target.classList.add('saved');
      }
    });
  }

  #controllSkeleton(order) {
    this.#$container.classList[order]('loading');
  }

  #appendVideos(videos) {
    _.go(
      videos,
      _.map(
        (video) =>
          `<li class="video-item">
            <img
              src="${video.thumbnail}"
              alt="video-item-thumbnail" class="video-item__thumbnail">
            <h4 class="video-item__title">[Playlist] ${video.title}</h4>
            <p class="video-item__channel-name">${video.channelTitle}</p>
            <p class="video-item__published-date">${video.date}</p>
            <button 
              data-video-id="${video.id}" 
              data-thumbnail="${video.thumbnail}"
              data-title="${video.title}"
              data-channelTitle="${video.channelTitle}"
              data-date="${video.date}"
              class="video-item__save-button button ${video.saved ? 'saved' : ''}">⬇ 저장</button>
          </li>`,
      ),
      _.join(''),
      (html) => this.#$firstSkeleton.insertAdjacentHTML('beforebegin', html),
    );
  }

  #controllScreen(order) {
    this.#$emptyScreen.classList[order]('empty');
  }

  #lastVideoItem() {
    return this.#$container.childNodes[
      this.#$container.childNodes.length - YOUTUBE_API_REQUEST_COUNT - 1
    ];
  }

  #initializeFirstSkeleton() {
    _.go(
      `<div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>`.repeat(YOUTUBE_API_REQUEST_COUNT),
      (skeletonsHTML) => this.#$container.insertAdjacentHTML('beforeend', skeletonsHTML),
    );

    this.#$firstSkeleton = $('.skeleton', this.#$container);
  }
}
