/* eslint-disable max-lines-per-function */
import { $ } from '../utils/dom';
import {
  MAX_SAVABLE_VIDEOS_COUNT,
  MAX_RENDER_VIDEOS_COUNT,
  SAVED_VIDEO_LIST_KEY,
} from '../constants/constant';
import { VideoItem, checkSearchResult} from '../videoItem';
import { isInputValueEmpty } from '../utils/checkvalue';
import { renderSkeletonItems, removeSkeleton } from '../views/render';
import { searchResultRequest, testRequest } from '../utils/request';
import StateController from './stateController';

export default class SearchModal extends StateController {
  nextPageToken = null;

  init() {
    this.$modal = $('.search-modal');
    this.$searchKeyWordInput = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.$modalSearchResult = $('.modal__search-result');
    this.$modalVideoList = $('.video-list', this.$modalSearchResult);
    this.addEvent();
  }

  addEvent() {
    this.$button.addEventListener('click', this.handleClickButton.bind(this));
    this.$modalVideoList.addEventListener('scroll', this.handleScroll.bind(this));
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
      this.$modalVideoList.insertAdjacentElement('beforeend', $el);
    });
  }

  async handleClickButton() {
    this.$modalVideoList.replaceChildren();
    const searchKeyWord = this.$searchKeyWordInput.value;
    if (isInputValueEmpty(searchKeyWord)) {
      return;
    }
    this.$modalSearchResult.classList.remove('search-result--no-result');
    renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, this.$modalVideoList);
    const searchResult = await testRequest(searchKeyWord, this.nextPageToken);
    //const searchResult = await searchResultRequest(searchKeyWord, this.nextPageToken);
    removeSkeleton(this.$modalVideoList);
    const videos = checkSearchResult(searchResult);

    if (videos.length === 0) {
      this.$modalSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.updateWholeVideoList(videos);
    this.$modalSearchResult.classList.remove('search-result--no-result');
    this.renderVideoItems(videos);
    this.nextPageToken = searchResult.nextPageToken;
  }

  async handleScroll() {
    const title = this.$searchKeyWordInput.value;
    const isScrollEnd =
      this.$modalVideoList.scrollHeight - this.$modalVideoList.scrollTop ===
      this.$modalVideoList.clientHeight;

    if (isScrollEnd && this.$modalVideoList.scrollTop !== 0) {
      renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, this.$modalVideoList);
      const searchResult = await searchResultRequest(title, this.nextPageToken);
      removeSkeleton(this.$modalVideoList);
      if (searchResult === null) {
        return;
      }
      this.nextPageToken = searchResult.nextPageToken;
      const videos = searchResult.items.map(item => new VideoItem(item));
      this.updateWholeVideoList(videos);
      this.renderVideoItems(videos);
    }
  }

  handleClickSaveButton(event) {
    const { target } = event;
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const videoList = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) ?? [];
    if (this.isSaveVideo(videoId, videoList)) {
      target.setAttribute('hidden', true);
    }
  }

  isSaveVideo(videoId, videoList) {
    if (videoList.length >= MAX_SAVABLE_VIDEOS_COUNT) {
      alert(`비디오는 ${MAX_SAVABLE_VIDEOS_COUNT}개 이상 저장할 수 없습니다`);
      return false;
    }
    console.log(this);
    this.saveVideo(videoId);
    return true;
  }
}
