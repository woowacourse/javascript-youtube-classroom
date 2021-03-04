import VideoLocalStorage from './models/localStorage.js';
import {
  API_SEARCH_ENDPOINT,
  PART_TYPE,
  SEARCH_TYPE_VIDEO,
  MAX_RESULT_COUNT,
  REGION_CODE,
  VIDEOS_TO_WATCH,
  STORAGE_CAPACITY_FULL,
  MAX_VIDEO_STORAGE_CAPACITY,
} from './constants.js';
import { getThumbnailTemplate, getChannelTitleTemplate, resultNotFoundTemplate } from './layout/searchResult.js';
import { getSkeletonTemplate } from './layout/skeleton.js';
import { formatDateKR } from './utils/formatDate.js';
import { $, isEndOfPage } from './utils/DOM.js';
import { YOUTUBE_API_KEY } from './env.js';
export default class App {
  #groupIndex;
  #keyword;
  #nextPageToken;

  constructor() {
    this.videoStorage = new VideoLocalStorage();
  }

  init() {
    this.selectDOMs();
    this.attachEvents();
  }

  selectDOMs() {
    this.$searchSection = $('#search-section');
    this.$searchResultWrapper = $('#search-result-wrapper');
    this.$searchKeywordForm = $('#search-keyword-form');
    this.$searchButton = $('#search-button');
    this.$modalCloseButton = $('#modal-close-button');
    this.$storedVideoCount = $('#stored-video-count');
    this.$snackbar = $('#snackbar');
  }

  attachEvents() {
    this.$searchButton.addEventListener('click', this.onShowModal.bind(this));
    this.$modalCloseButton.addEventListener('click', this.onCloseModal.bind(this));
    this.$searchKeywordForm.addEventListener('submit', this.onSearchKeyword.bind(this));
    this.$searchSection.addEventListener('scroll', this.onRequestNextResult.bind(this));
    this.$searchResultWrapper.addEventListener('click', this.onSaveVideo.bind(this));
  }

  showSnackbar(message) {
    this.$snackbar.innerText = message;
    this.$snackbar.classList.add('show');
    setTimeout(() => {
      this.$snackbar.classList.remove('show');
    }, 2000);
  }

  onSaveVideo({ target }) {
    if (target.type !== 'button') {
      return;
    }

    const $saveButton = target;
    const video = {
      videoId: $saveButton.dataset.videoId,
      videoTitle: $saveButton.dataset.videoTitle,
      channelId: $saveButton.dataset.channelId,
      channelTitle: $saveButton.dataset.channelTitle,
      publishedAt: $saveButton.dataset.publishedAt,
    };

    const storedCount = this.videoStorage.getStoredVideoCount();

    if (storedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.showSnackbar(STORAGE_CAPACITY_FULL);
      return;
    }

    this.videoStorage.addVideo(VIDEOS_TO_WATCH, video);
    this.showCurrentStoredVideoCount();
    $saveButton.classList.add('stored');
  }

  onShowModal() {
    this.$searchSection.classList.add('open');
    this.showCurrentStoredVideoCount();
  }

  onCloseModal() {
    this.$searchSection.classList.remove('open');
    this.$searchKeywordForm.reset();
  }

  onRequestNextResult() {
    if (!isEndOfPage(this.$searchSection)) {
      return;
    }
    this.renderSearchGroup();
  }

  showCurrentStoredVideoCount() {
    this.$storedVideoCount.innerText = this.videoStorage.getStoredVideoCount();
  }

  async request(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (e) {
      console.error(e);
    }
  }

  getRequestURL(queryStrings) {
    const queryStringFlattened = Object.keys(queryStrings)
      .map((key) => `&${key}=${queryStrings[key]}`)
      .join('');

    return `${API_SEARCH_ENDPOINT}?key=${YOUTUBE_API_KEY}`.concat(queryStringFlattened);
  }

  processJSON(rawData) {
    this.#nextPageToken = rawData.nextPageToken;

    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: formatDateKR(item.snippet.publishedAt),
    }));
  }

  storeVideoData($element, videoData) {
    $element.dataset.videoId = videoData.videoId;
    $element.dataset.videoTitle = videoData.videoTitle;
    $element.dataset.channelId = videoData.channelId;
    $element.dataset.channelTitle = videoData.channelTitle;
    $element.dataset.publishedAt = videoData.publishedAt;
  }

  renderSkeleton() {
    this.#groupIndex += 1;
    this.$searchResultWrapper.innerHTML += getSkeletonTemplate(this.#groupIndex);
  }

  renderSearchResult(videoList) {
    this.$currentGroup = $(`[data-group-index="${this.#groupIndex}"]`);
    this.$currentGroup.classList.remove('skeleton');

    if (videoList.length === 0) {
      this.$searchResultWrapper.innerHTML = resultNotFoundTemplate;
      return;
    }
    this.$currentGroup.querySelectorAll('article').forEach(($article, i) => {
      const video = videoList[i];
      const $saveButton = $article.querySelector('.save-button');

      $article.querySelector('.preview-container').innerHTML = getThumbnailTemplate(video.videoId);
      $article.querySelector('.video-title').innerText = video.videoTitle;
      $article.querySelector('.channel-title').innerHTML = getChannelTitleTemplate(video.channelId, video.channelTitle);
      $article.querySelector('.published-at').innerText = video.publishedAt;
      this.storeVideoData($saveButton, video);

      if (!this.videoStorage.isStoredVideo(video.videoId)) {
        $saveButton.classList.remove('stored');
        return;
      }

      $saveButton.classList.add('stored');
    });
  }

  onSearchKeyword(e) {
    e.preventDefault();

    this.#keyword = e.target.elements['search-keyword-input'].value;
    this.#groupIndex = -1;
    this.#nextPageToken = '';
    this.$searchResultWrapper.innerHTML = '';
    this.renderSearchGroup();
  }

  renderSearchGroup() {
    this.renderSkeleton();

    const url = this.getRequestURL({
      part: PART_TYPE,
      q: this.#keyword,
      type: SEARCH_TYPE_VIDEO,
      maxResults: MAX_RESULT_COUNT,
      regionCode: REGION_CODE,
      pageToken: this.#nextPageToken,
    });

    this.request(url)
      .then((response) => {
        return this.processJSON(response);
      })
      .then((videoList) => this.renderSearchResult(videoList))
      .catch((error) => console.error(error));
  }
}

const app = new App();
app.init();
