/* eslint-disable max-lines-per-function */
import { $, removeChildren } from './utils/dom';
import {
  MAX_SAVABLE_VIDEOS_COUNT,
  MAX_RENDER_VIDEOS_COUNT,
  LOCAL_STORAGE_VIDEO_LIST_KEY,
} from './constants/constant';
import VideoItem from './videoItem';

class SearchModal {
  serverUrl = 'https://silly-volhard-192918.netlify.app/.netlify/functions/youtube';

  nextPageToken = null;

  init() {
    this.$modal = $('.search-modal');
    this.$searchKeyWordInput = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.$searchResult = $('.search-result');
    this.$videoList = $('.video-list', this.$searchResult);

    this.$button.addEventListener('click', this.handleClickButton);
    this.$videoList.addEventListener('click', this.handleClickVideoList);
    this.$videoList.addEventListener('scroll', this.handleScroll);
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
      .join('');

    this.$videoList.insertAdjacentHTML('beforeend', videoListTemplate);
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

  checkSearchResult(searchResult) {
    if (searchResult === null) {
      return [];
    }
    const videos = searchResult.items.map(item => new VideoItem(item));
    return videos;
  }

  handleClickButton = async () => {
    removeChildren(this.$videoList);
    const searchKeyWord = this.$searchKeyWordInput.value;
    this.renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT);
    const searchResult = await this.request(searchKeyWord);
    this.removeSkeleton();
    const videos = this.checkSearchResult(searchResult);
    if (!videos) {
      this.$searchResult.classList.add('search-result--no-result');
      return;
    }
    this.$searchResult.classList.remove('search-result--no-result');
    this.renderVideoItems(videos);
    this.nextPageToken = searchResult.nextPageToken;
  };

  handleScroll = async () => {
    const title = this.$searchKeyWordInput.value;
    const isScrollEnd =
      this.$videoList.scrollHeight - this.$videoList.scrollTop === this.$videoList.clientHeight;

    if (isScrollEnd && this.$videoList.scrollTop !== 0) {
      this.renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT);
      const jsonResult = await this.request(title);
      this.removeSkeleton();
      if (jsonResult === null) {
        return;
      }
      this.nextPageToken = jsonResult.nextPageToken;
      const videos = jsonResult.items.map(item => new VideoItem(item));
      this.renderVideoItems(videos);
    }
  };

  handleClickSaveButton = event => {
    const { target } = event;
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const videoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VIDEO_LIST_KEY)) ?? [];
    if (this.saveVideo(videoId, videoList)) {
      target.setAttribute('hidden', true);
    }
  };

  handleClickVideoList = event => {
    const { target } = event;
    if (target.classList.contains('video-item__save-button')) {
      this.handleClickSaveButton(event);
    }
  };

  saveVideo(videoId, videoList) {
    if (videoList.length >= MAX_SAVABLE_VIDEOS_COUNT) {
      alert(`비디오는 ${MAX_SAVABLE_VIDEOS_COUNT}개 이상 저장할 수 없습니다`);
      return false;
    }
    localStorage.setItem(LOCAL_STORAGE_VIDEO_LIST_KEY, JSON.stringify([...videoList, videoId]));
    return true;
  }

  removeSkeleton() {
    [...this.$videoList.querySelectorAll('.skeleton')].forEach($el => $el.remove());
  }

  async request(query) {
    try {
      const url = new URL(this.serverUrl);
      const parameters = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        maxResults: MAX_RENDER_VIDEOS_COUNT,
        regionCode: 'kr',
        safeSearch: 'strict',
        pageToken: this.nextPageToken || '',
        q: query,
      });
      url.search = parameters.toString();

      const response = await fetch(url);
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error.message);
      }
      return body;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default SearchModal;
