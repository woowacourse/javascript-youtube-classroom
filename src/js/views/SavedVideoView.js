import { $ } from './utils.js';
import { YOUTUBE_API_REQUEST_COUNT, SELECTOR } from '../constants/index.js';

export default class SavedVideoView {
  #$playlist;
  #$watched;

  constructor(savedVideoIds) {
    this.#$playlist = $(SELECTOR.PLAYLIST_VIDEO);
    this.#$watched = $(SELECTOR.WATCHED_VIDEO);
    this.#bindSavedVideoList();
    this.#appendVideos(savedVideoIds);
  }

  #bindSavedVideoList() {
    $(SELECTOR.DISPLAY_PLAYLIST_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $(SELECTOR.DISPLAY_WATCHED_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
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
        <button data-video-id="${video.id}" class="check-watched-button video-list-button button ${
            kind === 'watched' ? 'watched' : ''
          }" type="button">✅</button>
        <button data-video-id="${video.id}" class="delete-button video-list-button button" type="button">🗑️</button>
      </li>`
      )
      .join('');
  }

  #appendVideos(videos) {
    this.#$playlist.insertAdjacentHTML('beforeend', this.#makeSavedVideoListTemplate('playlist', videos));
    this.#$watched.insertAdjacentHTML('beforeend', this.#makeSavedVideoListTemplate('watched', videos));
  }

  #changeVideoListContents(option) {
    $(SELECTOR.APP).classList[option]('hide_videolist');
  }
}
