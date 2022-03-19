/* eslint-disable max-lines-per-function */
import {
  $modalSearchResult,
  $modalVideoList,
  $searchKeyWordInput,
  $searchButton,
  $saveButton,
} from '../utils/dom';

import {
  MAX_SAVABLE_VIDEOS_COUNT,
  MAX_RENDER_VIDEOS_COUNT,
  SAVED_VIDEO_LIST_KEY,
} from '../constants/constant';

import { VideoItem, checkSearchResult } from '../videoItem';
import { isInputValueEmpty } from '../utils/checkvalue';
import { renderSkeletonItems, removeSkeleton } from '../views/skeleton';
import { renderVideoItems } from '../views/renderVideoItems';
import { searchResultRequest , testRequest} from '../utils/request';
import StateController from './stateController';

export default class SearchModal extends StateController {
  constructor() {
    super();
    this.nextPageToken = null;
    this.addEvent();
  }

  addEvent() {
    $searchButton.addEventListener('click', this.handleClickSearchButton.bind(this));
    $modalVideoList.addEventListener('click', this.handleClickSaveButton.bind(this));
    $modalVideoList.addEventListener('scroll', this.handleScroll.bind(this));
  }

  async handleScroll() {
    const title = $searchKeyWordInput.value;
    const isScrollEnd =
      $modalVideoList.scrollHeight - $modalVideoList.scrollTop === $modalVideoList.clientHeight;

    if (isScrollEnd && $modalVideoList.scrollTop !== 0) {
      renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, $modalVideoList);
      const searchResult = await searchResultRequest(title, this.nextPageToken);
      removeSkeleton($modalSearchResult);
      if (searchResult === null) {
        return;
      }
      this.nextPageToken = searchResult.nextPageToken;
      const videos = searchResult.items.map(item => new VideoItem(item));
      this.updateWholeVideoList(videos);
      renderVideoItems(videos, $modalSearchResult);
    }
  }

  async handleClickSearchButton() {
    $modalVideoList.replaceChildren();
    const searchKeyWord = $searchKeyWordInput.value;
    if (isInputValueEmpty(searchKeyWord)) {
      return true;
    }
    $modalSearchResult.classList.remove('search-result--no-result');
    renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, $modalVideoList);
    const searchResult = await testRequest(searchKeyWord, this.nextPageToken);
    //const searchResult = await searchResultRequest(searchKeyWord, this.nextPageToken);
    removeSkeleton($modalVideoList);
    const videos = checkSearchResult(searchResult);

    if (videos.length === 0) {
      $modalSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.updateWholeVideoList(videos);
    $modalSearchResult.classList.remove('search-result--no-result');
    renderVideoItems(videos, $modalSearchResult);
    this.nextPageToken = searchResult.nextPageToken;
  }

  handleClickSaveButton(e) {
    if (!e.target === $saveButton) {
      return;
    }
    const $videoItem = e.target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const videoList = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) ?? [];
    if (this.isSaveVideo(videoId, videoList)) {
      e.target.setAttribute('hidden', true);
    }
  }

  isSaveVideo(videoId, videoList) {
    if (videoList.length >= MAX_SAVABLE_VIDEOS_COUNT) {
      alert(`비디오는 ${MAX_SAVABLE_VIDEOS_COUNT}개 이상 저장할 수 없습니다`);
      return false;
    }
    this.saveVideo(videoId);
    return true;
  }
}
