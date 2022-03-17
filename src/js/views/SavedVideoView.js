import { $ } from './utils.js';
import { YOUTUBE_API_REQUEST_COUNT, SELECTOR } from '../constants/index.js';

export default class SavedVideoView {
  #$playlist;
  #$watched;

  constructor(savedVideoIds) {
    console.log(savedVideoIds);
    this.#$playlist = $('#playlist-video');
    this.#$watched = $('#watched-video');
    this.bindSavedVideoList();
    this.#appendVideos(savedVideoIds);
  }

  bindSavedVideoList() {
    $(SELECTOR.PLAYLIST_VIDEO).addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $(SELECTOR.WATCHED_VIDEO).addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
  }

  #appendVideos(videos) {
    console.log(videos);
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
    this.#$playlist.insertAdjacentHTML('beforeend', html);
  }

  #changeVideoListContents(option) {
    $(SELECTOR.APP).classList[option]('hide_videolist');
  }
}
