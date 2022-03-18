import { $ } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class SavedVideoView {
  #savedVideoData;
  #$playlist;
  #$watched;

  constructor(savedVideoData) {
    this.#savedVideoData = savedVideoData;
    this.#$playlist = $(SELECTOR.PLAYLIST_VIDEO);
    this.#$watched = $(SELECTOR.WATCHED_VIDEO);
    this.#bindSavedVideoList();
    this.#appendVideos();
  }

  #bindSavedVideoList() {
    $(SELECTOR.DISPLAY_PLAYLIST_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $(SELECTOR.DISPLAY_WATCHED_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
  }

  #changeVideoListContents(option) {
    $(SELECTOR.APP).classList[option]('hide_videolist');
  }

  #isValidVideo(kind, watched) {
    if (kind === 'playlist' && !watched) return true;
    if (kind === 'watched' && watched) return true;
    return false;
  }

  #makeSavedVideoListTemplate(kind, videos) {
    return videos
      .filter((video) => this.#isValidVideo(kind, video.watched))
      .map(
        (video) =>
          `<li class="video-item">
        <img
          src="${video.thumbnail}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">[Playlist] ${video.title}</h4>
        <p class="video-item__channel-name">${video.channelTitle}</p>
        <p class="video-item__published-date">${video.date}</p>
        <button data-kind="checkWatched" data-video-id="${video.id}" class="check-watched-button video-list-button button ${
            kind === 'watched' ? 'watched' : ''
          }" type="button">✅</button>
        <button data-kind="delete" data-video-id="${video.id}" class="delete-button video-list-button button" type="button">🗑️</button>
      </li>`
      )
      .join('');
  }

  #renderVideo() {
    this.#$playlist.innerHTML = this.#makeSavedVideoListTemplate('playlist', this.#savedVideoData);
    this.#$watched.innerHTML = this.#makeSavedVideoListTemplate('watched', this.#savedVideoData);
  }

  #appendVideos() {
    this.#renderVideo();
    this.#bindButtonEvent();
  }

  #bindButtonEvent() {
    $('#saved-video-list').addEventListener('click', (e) => {
      const element = e.target;
      if (element.dataset.kind === 'checkWatched') {
        const currentVideo = this.#savedVideoData.find((video) => video.id === element.dataset.videoId);
        currentVideo.watched = !currentVideo.watched;
        this.#renderVideo();
      }
    });
  }
}
