import {
  getThumbnailTemplate,
  getChannelTitleTemplate,
  resultNotFoundTemplate,
  getRecentKeywordsTemplate,
} from '../layout/searchResult.js';
import { getSkeletonTemplate } from '../layout/skeleton.js';
import { $ } from '../utils/DOM.js';
import { SNACKBAR_SHOW_TIME } from '../constants.js';

export default class SearchView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$searchResultWrapper = $('#search-result-wrapper');
    this.$searchSection = $('#search-section');
    this.$searchKeywordForm = $('#search-keyword-form');
    this.$searchButton = $('#search-button');
    this.$modalCloseButton = $('#modal-close-button');
    this.$recentKeywords = $('#recent-keyword');
    this.$storedVideoCount = $('#stored-video-count');
    this.$snackbar = $('#snackbar');
  }

  initSearchResult() {
    this.$searchResultWrapper.innerHTML = '';
  }

  setCurrentGroupElements() {
    this.$currentGroup = $('.search-result-group.skeleton');
    this.$currentGroupVideos = this.$currentGroup.querySelectorAll('article');
  }

  setCurrentVideoElements($video) {
    this.$video = $video;
    this.$saveButton = this.$video.querySelector('.save-button');
  }

  setCurrentSaveButton($saveButton) {
    this.$saveButton = $saveButton;
  }

  renderSnackbar(message) {
    this.$snackbar.innerText = message;
    this.$snackbar.classList.add('show');
    setTimeout(() => {
      this.$snackbar.classList.remove('show');
    }, SNACKBAR_SHOW_TIME);
  }

  renderStoredVideoCount(count) {
    this.$storedVideoCount.innerText = count;
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

  renderVideo(result) {
    this.$video.querySelector('.preview-container').innerHTML = getThumbnailTemplate(result.videoId);
    this.$video.querySelector('.video-title').innerText = result.videoTitle;
    this.$video.querySelector('.channel-title').innerHTML = getChannelTitleTemplate(
      result.channelId,
      result.channelTitle,
    );
    this.$video.querySelector('.published-at').innerText = result.publishedAt;
  }

  renderVisibleSaveButton() {
    this.$saveButton.classList.remove('stored');
  }

  renderInvisibleSaveButton() {
    this.$saveButton.classList.add('stored');
  }

  renderRecentKeywords(recentKeywords) {
    this.$recentKeywords.innerHTML = getRecentKeywordsTemplate(recentKeywords);
  }

  renderInvisibleModal() {
    this.$searchSection.classList.remove('open');
    this.$searchKeywordForm.reset();
  }
}
