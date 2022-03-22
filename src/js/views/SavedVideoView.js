import { $ } from './utils.js';
import { CONFIRM_MESSAGE, SELECTOR } from '../constants/index.js';
import UserStorage from '../UserStorage/index.js';

export default class SavedVideoView {
  #savedVideoData;
  #changeVideoWatchedStateBind;
  #$playList;
  #$watchedList;

  constructor() {
    this.#$playList = $(SELECTOR.PLAYLIST_VIDEO);
    this.#$watchedList = $(SELECTOR.WATCHED_VIDEO);
    this.#bindSavedVideoList();
    this.appendVideos();
  }

  appendVideos() {
    this.#savedVideoData = UserStorage.getVideoData();
    this.#renderVideo();
  }

  #bindSavedVideoList() {
    this.#changeVideoWatchedStateBind = this.#changeVideoWatchedState.bind(this);
    $(SELECTOR.DISPLAY_PLAYLIST_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $(SELECTOR.DISPLAY_WATCHED_SECTION).addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
  }

  #changeVideoListContents(option) {
    $(SELECTOR.APP).classList[option]('hide_videolist');
  }

  #isValidVideo(kind, watched) {
    if (kind === 'playList' && !watched) return true;
    if (kind === 'watchedList' && watched) return true;
    return false;
  }

  #setEmptyListDesign(kind, setting) {
    if (kind === 'playList') this.#$playList.classList[setting]('empty-savedList');
    if (kind === 'watchedList') this.#$watchedList.classList[setting]('empty-savedList');
  }

  #makeSavedVideoListTemplate(kind, videos) {
    const sameKindVideos = videos.filter((video) => this.#isValidVideo(kind, video.watched));
    if (sameKindVideos.length === 0) {
      this.#setEmptyListDesign(kind, 'add');
      return `<li>해당 영상이 없습니다.</li>`;
    }
    this.#setEmptyListDesign(kind, 'remove');
    return sameKindVideos
      .map(
        (video) =>
          `<li class="video-item">
        <img
          src="${video.thumbnail}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${video.title}</h4>
        <p class="video-item__channel-name">${video.channelTitle}</p>
        <p class="video-item__published-date">${video.date}</p>
        <button data-kind="checkWatched" data-video-id="${video.id}" class="check-watched-button video-list-button button ${
            kind === 'watchedList' ? 'watched' : ''
          }" type="button">✅</button>
        <button data-kind="delete" data-video-id="${video.id}" class="delete-button video-list-button button" type="button">🗑️</button>
      </li>`
      )
      .join('');
  }

  #renderVideo() {
    this.#$playList.innerHTML = this.#makeSavedVideoListTemplate('playList', this.#savedVideoData);
    this.#$watchedList.innerHTML = this.#makeSavedVideoListTemplate('watchedList', this.#savedVideoData);
    $(SELECTOR.SAVED_VIDEO_LIST).addEventListener('click', this.#changeVideoWatchedStateBind);
  }

  #updateSavedVideo() {
    UserStorage.editVideoData(this.#savedVideoData);
    $(SELECTOR.SAVED_VIDEO_LIST).removeEventListener('click', this.#changeVideoWatchedStateBind);
    this.#renderVideo();
  }

  #changeVideoWatchedState(e) {
    const element = e.target;
    const currentVideoIndex = this.#savedVideoData.findIndex((video) => video.id === element.dataset.videoId);
    if (element.dataset.kind === 'checkWatched') {
      this.#savedVideoData[currentVideoIndex].watched = !this.#savedVideoData[currentVideoIndex].watched;
      this.#updateSavedVideo();
    }
    if (element.dataset.kind === 'delete') {
      const checkDelete = confirm(CONFIRM_MESSAGE.CHECK_DELETE);
      if (checkDelete) {
        this.#savedVideoData.splice(currentVideoIndex, 1);
        this.#updateSavedVideo();
      }
    }
  }
}
