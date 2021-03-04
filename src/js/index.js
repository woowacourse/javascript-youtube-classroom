import { API_SEARCH_ENDPOINT, PART_TYPE, SEARCH_TYPE_VIDEO, MAX_RESULT_COUNT, REGION_CODE } from './constants.js';
import { getSkeletonTemplate } from './layout/skeleton.js';
import { formatDateKR } from './utils/formatDate.js';
import { getThumbnailTemplate, getChannelTitleTemplate, resultNotFoundTemplate } from './layout/searchResult.js';
import { YOUTUBE_API_KEY } from './env.js';
import { $, isEndOfPage } from './utils/DOM.js';
export default class App {
  #groupIndex;
  #keyword;
  #nextPageToken;

  constructor() {
    this.#nextPageToken = '';
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
  }

  attachEvents() {
    this.$searchButton.addEventListener('click', this.onShowModal.bind(this));
    this.$modalCloseButton.addEventListener('click', this.onCloseModal.bind(this));
    this.$searchKeywordForm.addEventListener('submit', this.onSearchKeyword.bind(this));
    this.$searchSection.addEventListener('scroll', this.onRequestNextResult.bind(this));
  }

  onShowModal() {
    this.$searchSection.classList.add('open');
  }

  onCloseModal() {
    this.$searchSection.classList.remove('open');
  }

  onRequestNextResult() {
    if (!isEndOfPage(this.$searchSection)) {
      return;
    }
    this.renderSearchGroup();
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

      $article.querySelector('.preview-container').innerHTML = getThumbnailTemplate(video.videoId);
      $article.querySelector('.video-title').innerText = video.videoTitle;
      $article.querySelector('.channel-title').innerHTML = getChannelTitleTemplate(video.channelId, video.channelTitle);
      $article.querySelector('.published-at').innerText = video.publishedAt;
      this.storeVideoData($article.querySelector('.save-button'), video);
    });
  }

  onSearchKeyword(e) {
    e.preventDefault();

    this.#keyword = e.target.elements['search-keyword-input'].value;
    this.#groupIndex = -1;

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
