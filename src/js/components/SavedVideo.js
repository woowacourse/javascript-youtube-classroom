import { SAVED_VIDEO_SUBSCRIBER_KEY } from '../model/index.js';
import { getVideoTemplate, SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../constants/index.js';
import {
  getVideoByIdList,
  $,
  $$,
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

    this.isChecked = isChecked;
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
      target.closest('article').remove();
      this.savedVideoManager.checkVideo(target.closest('ul').dataset.videoId);
      showSnackbar(this.isChecked ? SNACKBAR_MESSAGE.UNCHECK_VIDEO_SUCCESS : SNACKBAR_MESSAGE.CHECK_VIDEO_SUCCESS);
    }

    if (target.classList.contains('js-delete-button')) {
      customConfirm(CONFIRM_MESSAGE.DELETE_VIDEO, () => {
        target.closest('article').remove();
        this.savedVideoManager.deleteVideo(target.closest('ul').dataset.videoId);
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
      return { items: [] };
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
        <li class="mr-2">
          <button type="button" class="js-check-button emoji-btn scale-hover ${this.isChecked ? '' : 'opacity-hover'}">
            ✅
          </button>
        </li>
        <li class="mr-2"><button type="button" class="js-like-button emoji-btn bg-transparent scale-hover opacity-hover">👍</button></li>
        <li class="mr-2"><button type="button" class="js-comment-button emoji-btn bg-transparent scale-hover opacity-hover">💬</button></li>
        <li class="mr-2"><button type="button" class="js-delete-button emoji-btn bg-transparent scale-hover opacity-hover">🗑️</button></li>
      </ul>
    `;
  }

  async renderTotalVideo() {
    this.$savedVideoWrapper.innerHTML = '';

    const savedVideos = this.savedVideoManager.getSavedVideos();
    const filteredVideoIdList = this.savedVideoManager
      .getSortedSavedVideoIdList()
      .filter(id => savedVideos[id].isChecked === this.isChecked);

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);

      return;
    }

    hideElement(this.$emptyImage);
    renderSkeleton(this.$savedVideoWrapper, filteredVideoIdList.length);
    const savedVideoData = await this.fetchSavedVideoData(filteredVideoIdList);
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.innerHTML = savedVideoData.items.map(item => this.makeTemplate(item)).join('');
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
