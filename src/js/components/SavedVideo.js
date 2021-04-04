import { SAVED_VIDEO_SUBSCRIBER_KEY } from '../model/index.js';
import { getVideoTemplate, SNACKBAR_MESSAGE, CONFIRM_MESSAGE, FILTER } from '../constants/index.js';
import {
  getVideoByIdList,
  $,
  renderSkeleton,
  removeSkeleton,
  snackbar,
  showElement,
  hideElement,
  customConfirm,
} from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, filter }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');
    this.$emptyImage = $('.js-empty-image');

    this.filter = filter;
    this.savedVideoManager = savedVideoManager;
    this.initSubscription();

    this.initEvent();
    this.renderTotalVideo();
  }

  initEvent() {
    this.$savedVideoWrapper.addEventListener('click', this.handleEmojiButton.bind(this));
  }

  initSubscription() {
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.SAVE,
      subscriber: this.renderNewVideo.bind(this),
    });
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.SAVE,
      subscriber: this.renderEmptyImage.bind(this),
    });
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.DELETE,
      subscriber: this.renderEmptyImage.bind(this),
    });
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.CHECK,
      subscriber: this.renderEmptyImage.bind(this),
    });
  }

  handleEmojiButton({ target }) {
    if (!target.classList.contains('emoji-btn')) {
      return;
    }

    if (target.classList.contains('js-check-button')) {
      if (this.filter === FILTER.WATCH) {
        $(`[data-video-id=${target.dataset.videoId}]:not(button)`).remove();
      }
      target.classList.toggle('opacity-hover');
      this.savedVideoManager.watchVideo(target.dataset.videoId);
      snackbar.show(
        this.filter === FILTER.WATCH ? SNACKBAR_MESSAGE.MAKE_WATCHED_VIDEO : SNACKBAR_MESSAGE.MAKE_WATCH_VIDEO
      );

      return;
    }

    if (target.classList.contains('js-like-button')) {
      if (this.filter === FILTER.LIKED) {
        $(`[data-video-id=${target.dataset.videoId}]:not(button)`).remove();
      }
      target.classList.toggle('opacity-hover');
      this.savedVideoManager.likeVideo(target.dataset.videoId);
      snackbar.show(this.FILTER === FILTER.LIKED ? SNACKBAR_MESSAGE.UNLIKE_VIDEO : SNACKBAR_MESSAGE.LIKE_VIDEO);

      return;
    }

    if (target.classList.contains('js-delete-button')) {
      customConfirm(CONFIRM_MESSAGE.DELETE_VIDEO, () => {
        $(`[data-video-id=${target.dataset.videoId}]:not(button)`).remove();
        this.savedVideoManager.deleteVideo(target.dataset.videoId);
        snackbar.show(SNACKBAR_MESSAGE.DELETE_SUCCESS);
      });
    }
  }

  async fetchSavedVideoData(idList) {
    try {
      return await getVideoByIdList(idList);
    } catch (e) {
      console.error(e);
      snackbar.show(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
      return { items: [] };
    }
  }

  setState({ filter }) {
    if (filter && this.filter !== filter) {
      this.filter = filter;
      this.renderTotalVideo();
    }
  }

  makeTemplate(videoData, videoState) {
    return getVideoTemplate({
      videoData,
      buttonTemplate: this.getButtonTemplate(videoData.id, videoState),
    });
  }

  getButtonTemplate(videoId, videoState) {
    console.log(videoState);
    return `
      <ul class="list-style-none p-0 mt-3 mb-6 d-flex">
        <li class="mr-2">
          <button data-video-id="${videoId}" type="button" class="js-check-button emoji-btn scale-hover ${
      videoState.isWatched ? '' : 'opacity-hover'
    }">
            ✅
          </button>
        </li>
        <li class="mr-2">
          <button data-video-id="${videoId}" type="button" class="js-like-button emoji-btn bg-transparent scale-hover ${
      videoState.isLiked ? '' : 'opacity-hover'
    }">👍</button>
        </li>
        <li class="mr-2">
          <button data-video-id="${videoId}" type="button" class="js-delete-button emoji-btn bg-transparent scale-hover opacity-hover">🗑️</button>
        </li>
      </ul>
    `;
  }

  async renderTotalVideo() {
    this.$savedVideoWrapper.innerHTML = '';

    const savedVideos = this.savedVideoManager.getSavedVideos();
    const filteredVideoIdList = this.savedVideoManager.getSortedSavedVideoIdList().filter(id => {
      if (this.filter === FILTER.LIKED) {
        return savedVideos[id].isLiked;
      }

      if (this.filter === FILTER.WATCH) {
        return !savedVideos[id].isWatched;
      }

      if (this.filter === FILTER.WATCHED) {
        return savedVideos[id].isWatched;
      }
    });

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);

      return;
    }

    hideElement(this.$emptyImage);
    renderSkeleton(this.$savedVideoWrapper, filteredVideoIdList.length);
    const savedVideoData = await this.fetchSavedVideoData(filteredVideoIdList);
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.innerHTML = savedVideoData.items
      .map(item => this.makeTemplate(item, savedVideos[item.id]))
      .join('');
  }

  async renderNewVideo(videoId) {
    if (this.isChecked) {
      return;
    }

    renderSkeleton(this.$savedVideoWrapper, 1);
    const newVideoData = await this.fetchSavedVideoData(videoId);
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.insertAdjacentHTML('afterbegin', this.makeTemplate(newVideoData.items[0]));
  }

  renderEmptyImage() {
    const savedVideos = this.savedVideoManager.getSavedVideos();
    const filteredVideoIdList = this.savedVideoManager
      .getSavedVideoIdList()
      .filter(id => savedVideos[id].isChecked === this.isChecked);

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);
    } else {
      hideElement(this.$emptyImage);
    }
  }
}
