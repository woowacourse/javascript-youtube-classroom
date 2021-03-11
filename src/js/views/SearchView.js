import { getThumbnailTemplate, getChannelTitleTemplate, resultNotFoundTemplate } from './layout/searchResult.js';
import { getSkeletonTemplate } from './layout/skeleton.js';
import { $ } from '../utils/DOM.js';
import { SNACKBAR_SHOW_TIME } from '../constants.js';

export default class SearchView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$searchResultWrapper = $('.js-search-result-wrapper');
    this.$searchSection = $('.js-modal');
    this.$searchKeywordForm = $('.js-search-keyword-form');
    this.$searchButton = $('.js-search-button');
    this.$modalCloseButton = $('.js-modal-close-button');
    this.$recentKeywords = $('.js-recent-keyword');
    this.$savedVideoCount = $('.js-saved-video-count');
    this.$snackbar = $('.js-snackbar');
  }

  init() {
    this.$searchResultWrapper.innerHTML = '';
  }

  setCurrentGroupElements() {
    this.$currentGroup = $('.js-search-result-group.skeleton');
    this.$currentGroupVideos = this.$currentGroup.querySelectorAll('article');
  }

  setCurrentVideoElements($video) {
    this.$video = $video;
    this.$saveButton = this.$video.querySelector('.js-save-button');
  }

  setCurrentSaveButton($saveButton) {
    this.$saveButton = $saveButton;
  }

  renderSkeleton() {
    this.$searchResultWrapper.innerHTML += getSkeletonTemplate();
  }

  renderSkeletonRemoved() {
    this.$currentGroup.classList.remove('skeleton');
  }

  renderResultNotFound() {
    this.$searchResultWrapper.innerHTML = resultNotFoundTemplate;
  }

  renderSearchResult(searchResult) {
    this.setCurrentGroupElements();
    this.renderSkeletonRemoved();

    if (searchResult.length === 0) {
      this.renderResultNotFound();
      return;
    }

    this.renderVideos(searchResult);
  }

  renderVideos(searchResult) {
    this.$currentGroupVideos.forEach(($video, i) => {
      const result = searchResult[i];
      const $saveButton = $video.querySelector('.js-save-button');

      this.renderVideo($video, result);
      $saveButton.id = result.videoId;
      result.isSaved ? this.renderInvisibleSaveButton($saveButton) : this.renderVisibleSaveButton($saveButton);
    });
  }

  renderVideo($video, result) {
    $video.querySelector('.js-preview-container').innerHTML = getThumbnailTemplate(result.videoId);
    $video.querySelector('.js-video-title').innerText = result.videoTitle;
    $video.querySelector('.js-channel-title').innerHTML = getChannelTitleTemplate(
      result.channelId,
      result.channelTitle,
    );
    $video.querySelector('.js-published-at').innerText = result.publishedAt;
  }

  renderVisibleSaveButton($saveButton) {
    $saveButton.classList.remove('saved');
  }

  renderInvisibleSaveButton($saveButton) {
    $saveButton.classList.add('saved');
  }

  renderNotification(message) {
    this.$snackbar.innerText = message;
    this.$snackbar.classList.add('show');
    setTimeout(() => {
      this.$snackbar.classList.remove('show');
    }, SNACKBAR_SHOW_TIME);
  }

  renderSaveVideoCount(videoCount) {
    this.$savedVideoCount.innerText = videoCount;
  }

  renderRecentKeywords(keywords) {
    keywords.forEach((keyword, index) => {
      this.$recentKeywords.children[index].innerText = keyword;
      this.$recentKeywords.children[index].classList.remove('v-hidden');
    });
  }

  renderVisibleModal(videoCount, keywords) {
    this.$searchSection.classList.add('open');
    this.init();
    this.renderSaveVideoCount(videoCount);
    this.renderRecentKeywords(keywords);
  }

  renderInvisibleModal() {
    this.$searchSection.classList.remove('open');
    this.$searchKeywordForm.reset();
  }
}
