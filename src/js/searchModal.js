/* eslint-disable max-lines-per-function */
import { $, removeChildren } from './utils/dom';
import VideoItem from './videoItem';

class SearchModal {
  apikey = 'AIzaSyCr0ODcPGNBRByd4pZGQucF31LpqN1zGD0';

  baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  nextPageToken = null;

  maxResultCount = 10;

  localStorageVideoListKey = 'local-storage-video-list-key';

  maxSavableVideoCount = 5;

  constructor() {
    this.$modal = $('.search-modal');
    this.$searchKeyWordInput = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.$searchResult = $('.search-result');
    this.$videoList = $('.video-list', this.$searchResult);
    this.addEvent();
  }

  renderVideoItems(videos) {
    const videoListTemplate = videos
      .map(video => {
        return `<li class="video-item" data-video-id="${video.id}">
          <img
            src="${video.thumbnailUrl}"
            alt="video-item-thumbnail" class="video-item__thumbnail" />
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${video.publishedAt}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>`;
      })
      .join('\n'); // new line해주지 않으면 insertAdjacentHTML을 사용할때 element가 5개만 생성된다.

    const template = document.createElement('template');
    template.insertAdjacentHTML('beforeend', videoListTemplate);

    template.childNodes.forEach($el => {
      $el.addEventListener('click', this.handleClickSaveButton.bind(this));
      this.$videoList.insertAdjacentElement('beforeend', $el);
    });
  }

  renderSkeletonItems(videoCount) {
    const skeletonListHtmlString = [...Array(videoCount).keys()]
      .map(
        () => `
          <div class="skeleton">
            <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>
          </div>
        `
      )
      .join('');

    this.$videoList.insertAdjacentHTML('beforeend', skeletonListHtmlString);
  }

  addEvent() {
    this.$button.addEventListener('click', this.handleClickButton.bind(this));
    this.$videoList.addEventListener('scroll', this.handleScroll.bind(this));
  }

  renderResult(searchResult) {
    if (searchResult === null) {
      this.$searchResult.classList.add('search-result--no-result');
      return;
    }

    this.$searchResult.classList.remove('search-result--no-result');
    this.nextPageToken = searchResult.nextPageToken;
    const videos = searchResult.items.map(item => new VideoItem(item));
    this.renderVideoItems(videos);
  }

  async handleClickButton() {
    removeChildren(this.$videoList);
    const searchKeyWord = this.$searchKeyWordInput.value;
    this.renderSkeletonItems(this.maxResultCount);
    const searchResult = await this.request(searchKeyWord);
    this.removeSkeleton();
    this.renderResult(searchResult);
  }

  async handleScroll() {
    const title = this.$searchKeyWordInput.value;
    const isScrollEnd =
      this.$videoList.scrollHeight - this.$videoList.scrollTop === this.$videoList.clientHeight;
    if (isScrollEnd) {
      this.renderSkeletonItems(this.maxResultCount);
      const jsonResult = await this.request(title);
      this.removeSkeleton();
      if (jsonResult === null) {
        return;
      }
      this.nextPageToken = jsonResult.nextPageToken;
      const videos = jsonResult.items.map(item => new VideoItem(item));
      this.renderVideoItems(videos);
    }
  }

  handleClickSaveButton(event) {
    const { target } = event;
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const videoList = JSON.parse(localStorage.getItem(this.localStorageVideoListKey)) ?? [];
    if (videoList.length >= this.maxSavableVideoCount) {
      alert(`비디오는 ${this.maxSavableVideoCount}개 이상 저장할 수 없습니다`);
      return;
    }
    localStorage.setItem(this.localStorageVideoListKey, JSON.stringify([...videoList, videoId]));
    target.setAttribute('hidden', true);
  }

  removeSkeleton() {
    [...this.$videoList.querySelectorAll('.skeleton')].forEach($el => $el.remove());
  }

  async request(title) {
    let url = `${this.baseUrl}?part=snippet&type=video&maxResults=${this.maxResultCount}&q=${title}&pageToken=${this.nextPageToken}&key=${this.apikey}`;
    if (this.nextPageToken === null) {
      url = `${this.baseUrl}?part=snippet&maxResults=${this.maxResultCount}&q=${title}&key=${this.apikey}`;
    }
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return json;
    } catch (e) {
      return null;
    }
  }
}

export default SearchModal;
