import { SAVED_VIDEO_SUBSCRIBER_KEY } from '../model/index.js';
import { getVideoTemplate, SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../constants/index.js';
import {
  getVideoByIdList,
  $,
  renderSkeleton,
  removeSkeleton,
  showSnackbar,
  showElement,
  hideElement,
  customConfirm,
} from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, isChecked }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');
    this.$emptyImage = $('.js-empty-image');

    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.SAVE,
      subscriber: this.renderNewVideo.bind(this),
    });

    this.isChecked = isChecked;
    this.initEvent();
    this.renderTotalVideo();
  }

  initEvent() {
    this.$savedVideoWrapper.addEventListener('click', this.handleEmojiButton.bind(this));
  }

  handleEmojiButton({ target }) {
    if (!target.classList.contains('emoji-btn')) {
      return;
    }

    if (target.classList.contains('js-check-button')) {
      this.savedVideoManager.checkVideo(target.closest('ul').dataset.videoId);
      target.closest('article').remove();
      showSnackbar(this.isChecked ? SNACKBAR_MESSAGE.UNCHECK_VIDEO_SUCCESS : SNACKBAR_MESSAGE.CHECK_VIDEO_SUCCESS);

      if (this.$savedVideoWrapper.children.length === 0) {
        showElement(this.$emptyImage);
      }
    }

    if (target.classList.contains('js-delete-button')) {
      if (this.$savedVideoWrapper.children.length === 0) {
        showElement(this.$emptyImage);
      }
      customConfirm(CONFIRM_MESSAGE.DELETE_VIDEO, () => {
        this.savedVideoManager.deleteVideo(target.closest('ul').dataset.videoId);
        target.closest('article').remove();
        showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
      });
    }
  }

  async fetchSavedVideoData(idList) {
    try {
      return await getVideoByIdList(idList);
    } catch (e) {
      console.error(e);
      showSnackbar(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
    }
  }

  setState({ isChecked }) {
    this.isChecked = isChecked ?? this.isChecked;

    this.renderTotalVideo();
  }

  makeTemplate(videoData) {
    return getVideoTemplate({
      videoData,
      buttonTemplate: this.getButtonTemplate(videoData.id),
    });
  }

  getButtonTemplate(videoId) {
    return `
      <ul class="list-style-none p-0 mt-3 mb-6 d-flex" data-video-id="${videoId}">
        <li class="mr-2"><button type="button" class="js-check-button emoji-btn opacity-hover">✅</button></li>
        <li class="mr-2"><button type="button" class="js-like-button emoji-btn opacity-hover">👍</button></li>
        <li class="mr-2"><button type="button" class="js-comment-button emoji-btn opacity-hover">💬</button></li>
        <li class="mr-2"><button type="button" class="js-delete-button emoji-btn opacity-hover">🗑️</button></li>
      </ul>
    `;
  }

  async renderTotalVideo() {
    this.$savedVideoWrapper.innerHTML = '';

    const savedVideos = this.savedVideoManager.getSavedVideos();
    const filteredVideoIdList = this.savedVideoManager
      .getSavedVideoIdList()
      .filter(id => savedVideos[id].isChecked === this.isChecked);

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);

      return;
    }

    hideElement(this.$emptyImage);
    renderSkeleton(this.$savedVideoWrapper, filteredVideoIdList.length);
    const savedVideoData = await this.fetchSavedVideoData(this.savedVideoManager.getSavedVideoIdList());
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.innerHTML = savedVideoData.items
      .filter(item => filteredVideoIdList.includes(item.id))
      .map(item => this.makeTemplate(item))
      .join('');
  }

  async renderNewVideo(videoId) {
    if (this.isChecked) {
      return;
    }

    if ($('.js-empty-image')) {
      hideElement(this.$emptyImage);
    }

    renderSkeleton(this.$savedVideoWrapper, 1);
    const newVideoData = await this.fetchSavedVideoData(videoId);
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.insertAdjacentHTML('afterbegin', this.makeTemplate(newVideoData.items[0]));
  }
}
