import VideoItemView from './VideoItemView.js';
import videoStorage from '../videoStorage.js';
import { DOM_STRING, EVENT, VIDEO_LIST, VIDEO_TYPE } from '../utils/constants.js';
import { $, throttle } from '../utils/common.js';
import notFoundImage from '../../assets/images/not_found.png';

export default class ModalView {
  constructor() {
    this.registerDOM();
    this.registerImage();
    this.videoItemList = [];
  }

  registerDOM() {
    this.$modalContainer = $(DOM_STRING.MODAL_CONTAINER);
    this.$dimmer = $(DOM_STRING.DIMMER);
    this.$videoList = $(DOM_STRING.VIDEO_LIST);
    this.$searchButton = $(DOM_STRING.SEARCH_BUTTOM);
    this.$searchInput = $(DOM_STRING.SEARCH_INPUT);
    this.$searchNoResult = $(DOM_STRING.SEARCH_NO_RESULT);
    this.$searchReslt = $(DOM_STRING.SEARCH_RESULT);
    this.$noResultImage = $(DOM_STRING.NO_RESULT_IMAGE);
  }

  registerImage() {
    this.$noResultImage.src = notFoundImage;
  }

  showResult() {
    this.$searchReslt.classList.remove(DOM_STRING.HIDE);
    this.$searchNoResult.classList.add(DOM_STRING.HIDE);
  }

  showNoResult() {
    this.$searchNoResult.classList.remove(DOM_STRING.HIDE);
    this.$searchReslt.classList.add(DOM_STRING.HIDE);
  }

  showModal() {
    this.$modalContainer.classList.remove(DOM_STRING.HIDE);
    this.showResult();
    this.$searchInput.value = '';
    this.focusSearch();
  }

  hideModal() {
    this.$modalContainer.classList.add(DOM_STRING.HIDE);
  }

  bindOnClickDimmer(callback) {
    this.$dimmer.addEventListener('click', callback);
  }

  bindOnClickSearchButton(callback) {
    this.$searchButton.addEventListener('click', () => {
      callback(this.$searchInput.value);
    });
    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === EVENT.KEYBOARD.ENTER) {
        callback(this.$searchInput.value);
      }
    });
  }

  bindVideoListScroll(callback) {
    this.$videoList.addEventListener('scroll', throttle(this.scrollToBottom.bind(this, callback)));
  }

  bindOnClickStoreButton(callback) {
    this.$videoList.addEventListener('click', event => {
      try {
        if (event.target.classList.contains(DOM_STRING.VIDEO_ITEM_SAVE_BUTTON)) {
          videoStorage.checkOverMaxLength();
          const clickedVideo = event.target.parentElement;
          event.target.classList.add(DOM_STRING.HIDE);
          callback(this.parseVideoInfo(clickedVideo));
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }

  scrollToBottom(callback) {
    const isScrollBottom =
      this.$videoList.scrollHeight - this.$videoList.scrollTop <=
      this.$videoList.offsetHeight + EVENT.SCROLL.OFFSET;

    if (isScrollBottom) {
      callback(this.$searchInput.value);
    }
  }

  resetVideoList() {
    this.$searchNoResult.classList.add(DOM_STRING.HIDE);
    this.$videoList.classList.remove(DOM_STRING.HIDE);
    this.$videoList.textContent = '';
    this.videoItemList = [];
  }

  appendEmptyList() {
    this.$videoList.insertAdjacentHTML('beforeend', '<li></li>'.repeat(VIDEO_LIST.RENDER_SIZE));
  }

  appendVideoItem() {
    [...this.$videoList.childNodes].slice(-VIDEO_LIST.RENDER_SIZE).forEach(li => {
      this.videoItemList.push(new VideoItemView(li));
    });
  }

  renderSkeletonUI() {
    this.videoItemList
      .slice(-VIDEO_LIST.RENDER_SIZE)
      .forEach(videoItem => videoItem.renderSkeletonList());
  }

  renderVideoList(videoList) {
    this.showResult();
    if (videoList.length === 0) {
      this.showNoResult();
      return;
    }
    this.hideSkeletonTemplates(videoList);
    this.videoItemList
      .slice(-videoList.length)
      .forEach((videoItem, index) => videoItem.renderSearchVideoList(videoList[index]));
  }

  hideSkeletonTemplates(videoList) {
    if (videoList.length < VIDEO_LIST.RENDER_SIZE) {
      this.videoItemList
        .slice(-VIDEO_LIST.RENDER_SIZE)
        .slice(0, videoList.length)
        .forEach(el => {
          el.$element.classList.add('hide');
        });
    }
  }

  focusSearch() {
    this.$searchInput.focus();
  }

  parseVideoInfo(videoInfo) {
    const [thumbnailImg, title, channelTitle, publishedAt, videoId] = videoInfo.children;
    return {
      videoId: videoId.dataset.videoId,
      publishedAt: publishedAt.textContent,
      title: title.textContent,
      url: thumbnailImg.src,
      channelTitle: channelTitle.textContent,
      type: VIDEO_TYPE.WATCH_LATER,
    };
  }
}
