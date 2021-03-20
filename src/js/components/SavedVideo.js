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
  setLazyLoading,
} from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, isChecked, isLiked }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');
    this.$emptyImage = $('.js-empty-image');

    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.SAVE,
      subscriber: this.renderNewVideo.bind(this),
    });
    this.savedVideoManager.subscribeAll({ subscriber: this.renderEmptyImage.bind(this) });

    this.isChecked = isChecked;
    this.isLiked = isLiked;

    this.initEvent();
    this.initLoad();
  }

  initEvent() {
    this.$savedVideoWrapper.addEventListener('click', this.handleEmojiButtons.bind(this));
  }

  handleEmojiButtons({ target }) {
    if (!target.classList.contains('emoji-btn')) {
      return;
    }

    if (target.classList.contains('js-check-button')) {
      this.handleCheckButton(target);
    }

    if (target.classList.contains('js-delete-button')) {
      this.handleDeleteButton(target);
    }

    if (target.classList.contains('js-like-button')) {
      this.handleLikeButton(target);
    }
  }

  handleCheckButton(target) {
    if (!this.isLiked) {
      target.closest('.js-saved-clip-article').classList.add('d-none');
    }

    this.savedVideoManager.checkVideo(target.closest('.js-emoji-button-list').dataset.videoId);
    const isCheckedVideo = this.savedVideoManager.isCheckedVideo(
      target.closest('.js-emoji-button-list').dataset.videoId
    );

    if (isCheckedVideo) {
      target.classList.remove('opacity-hover');
    } else {
      target.classList.add('opacity-hover');
    }

    showSnackbar(isCheckedVideo ? SNACKBAR_MESSAGE.CHECK_VIDEO_SUCCESS : SNACKBAR_MESSAGE.UNCHECK_VIDEO_SUCCESS);
  }

  handleLikeButton(target) {
    if (this.isLiked) {
      target.closest('.js-saved-clip-article').classList.add('d-none');
    }

    this.savedVideoManager.likeVideo(target.closest('.js-emoji-button-list').dataset.videoId);
    const isLikedVideo = this.savedVideoManager.isLikedVideo(target.closest('.js-emoji-button-list').dataset.videoId);

    if (isLikedVideo) {
      target.classList.remove('opacity-hover');
    } else {
      target.classList.add('opacity-hover');
    }

    showSnackbar(isLikedVideo ? SNACKBAR_MESSAGE.LIKE_VIDEO_SUCCESS : SNACKBAR_MESSAGE.UNLIKE_VIDEO_SUCCESS);
  }

  handleDeleteButton(target) {
    customConfirm(CONFIRM_MESSAGE.DELETE_VIDEO)
      .then(() => {
        target.closest('.js-saved-clip-article').remove();
        this.savedVideoManager.deleteVideo(target.closest('.js-emoji-button-list').dataset.videoId);
        showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
      })
      .catch(() => {});
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

  makeTemplate(videoData, classList = []) {
    return getVideoTemplate({
      videoData,
      classList,
      buttonTemplate: this.getButtonTemplate(videoData.id),
    });
  }

  getButtonTemplate(videoId) {
    return `
      <ul class="js-emoji-button-list list-style-none p-0 mt-3 mb-6 d-flex justify-end" data-video-id="${videoId}">
        <li class="mr-2">
          <button type="button" class="js-check-button emoji-btn scale-hover ${
            this.savedVideoManager.isCheckedVideo(videoId) ? '' : 'opacity-hover'
          }">✅</button>
        </li>
        <li class="mr-2">
          <button type="button" class="js-like-button emoji-btn scale-hover ${
            this.savedVideoManager.isLikedVideo(videoId) ? '' : 'opacity-hover'
          }">👍</button>
        </li>
        <li class="mr-2"><button type="button" class="js-delete-button emoji-btn scale-hover opacity-hover">🗑️</button></li>
      </ul>
    `;
  }

  async renderTotalVideo() {
    this.$savedVideoWrapper.innerHTML = '';

    const savedVideos = this.savedVideoManager.getSavedVideos();

    if (this.isLiked) {
      this.$savedVideoWrapper.innerHTML = this.savedVideoData.items
        .map(item => {
          if (savedVideos[item.id].isLiked === this.isLiked) {
            return this.makeTemplate(item, ['js-saved-clip-article']);
          }
          return this.makeTemplate(item, ['js-saved-clip-article', 'd-none']);
        })
        .join('');
    } else {
      this.$savedVideoWrapper.innerHTML = this.savedVideoData.items
        .map(item => {
          if (savedVideos[item.id].isChecked === this.isChecked) {
            return this.makeTemplate(item, ['js-saved-clip-article']);
          }
          return this.makeTemplate(item, ['js-saved-clip-article', 'd-none']);
        })
        .join('');
    }

    if ($$('.js-saved-clip-article').length === $$('.js-saved-clip-article.d-none').length) {
      showElement(this.$emptyImage);
    }
    setLazyLoading(this.$savedVideoWrapper);
  }

  async renderNewVideo(videoId) {
    if (this.isChecked) {
      return;
    }

    renderSkeleton(this.$savedVideoWrapper, 1);
    const newVideoData = await this.fetchSavedVideoData(videoId);
    removeSkeleton(this.$savedVideoWrapper);

    this.$savedVideoWrapper.insertAdjacentHTML(
      'afterbegin',
      this.makeTemplate(newVideoData.items[0], ['js-saved-clip-article'])
    );
    setLazyLoading(this.$savedVideoWrapper);
  }

  renderEmptyImage() {
    const savedVideos = this.savedVideoManager.getSavedVideos();
    const sortedSavedVideoIdList = this.savedVideoManager.getSortedSavedVideoIdList();
    let filteredVideoIdList;

    if (this.isLiked) {
      filteredVideoIdList = sortedSavedVideoIdList.filter(id => savedVideos[id].isLiked === this.isLiked);
    } else {
      filteredVideoIdList = sortedSavedVideoIdList.filter(id => savedVideos[id].isChecked === this.isChecked);
    }

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);
    } else {
      hideElement(this.$emptyImage);
    }
  }

  renderMatchedVideo() {
    hideElement(this.$emptyImage);
    const savedVideos = this.savedVideoManager.getSavedVideos();
    const sortedSavedVideoIdList = this.savedVideoManager.getSortedSavedVideoIdList();
    let filteredVideoIdList;

    if (this.isLiked) {
      filteredVideoIdList = sortedSavedVideoIdList.filter(id => savedVideos[id].isLiked === this.isLiked);
    } else {
      filteredVideoIdList = sortedSavedVideoIdList.filter(id => savedVideos[id].isChecked === this.isChecked);
    }

    if (filteredVideoIdList.length === 0) {
      showElement(this.$emptyImage);
    }

    if (this.isLiked) {
      $$('.js-saved-clip-article').forEach(clip => {
        if (savedVideos[clip.dataset.videoId].isLiked === this.isLiked) {
          clip.classList.remove('d-none');
        } else {
          clip.classList.add('d-none');
        }
      });

      return;
    }

    $$('.js-saved-clip-article').forEach(clip => {
      if (savedVideos[clip.dataset.videoId].isChecked === this.isChecked) {
        clip.classList.remove('d-none');
      } else {
        clip.classList.add('d-none');
      }
    });
  }

  async initLoad() {
    const savedVideos = this.savedVideoManager.getSavedVideos();
    const sortedSavedVideoIdList = this.savedVideoManager.getSortedSavedVideoIdList();
    let filteredVideoIdList;

    filteredVideoIdList = sortedSavedVideoIdList.filter(id => savedVideos[id].isChecked === false);

    renderSkeleton(this.$savedVideoWrapper, filteredVideoIdList.length);
    this.savedVideoData = await this.fetchSavedVideoData(sortedSavedVideoIdList);
    removeSkeleton(this.$savedVideoWrapper);
    this.renderTotalVideo();
  }

  setState({ isChecked, isLiked }) {
    this.isChecked = isChecked ?? this.isChecked;
    this.isLiked = isLiked ?? this.isLiked;

    this.renderMatchedVideo();
  }
}
