/* eslint-disable max-lines-per-function */
import SearchModal from './searchModal';
import {
  $,
  $searchKeyWordInput,
  $modalSearchResult,
  $modalVideoList,
  $mainSearchResult,
  $mainVideoList,
  $searchModalButton,
  $watchedVideoMenuButton,
  $toWatchedVideoMenuButton,
  $dimmer,
} from '../utils/dom';

import { renderVideoItems } from '../views/renderVideoItems';
import StateController from './stateController';

export default class MainPage extends StateController {
  constructor() {
    super();
    this.addEvent();
    new SearchModal();
  }

  async init() {
    await this.initVideoLists();
    if (StateController.savedToWatchVideoList.length === 0) {
      $mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    renderVideoItems(StateController.savedToWatchVideoList, $mainSearchResult);
  }

  addEvent() {
    $searchModalButton.addEventListener('click', this.openModal);
    $watchedVideoMenuButton.addEventListener('click', this.handleClickWatchedButton.bind(this));
    $toWatchedVideoMenuButton.addEventListener('click', this.handleClickNoWatchedButton.bind(this));
    $mainVideoList.addEventListener('click', this.handleClickVideoButtons.bind(this));
    $dimmer.addEventListener('click', this.closeModal.bind(this));
  }

  handleClickVideoButtons(e) {
    if (e.target === $('#check-button', $mainVideoList)) {
      this.handleClickCheckButton(e);
    }
    if (e.target === $('#delete-button', $mainVideoList)) {
      this.handleClickDeleteButton(e);
    }
  }

  handleClickCheckButton(e) {
    e.target.setAttribute('disabled', '');
    const $videoItem = e.target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    this.watchVideo(videoId);
    $mainVideoList.replaceChildren();
    renderVideoItems(StateController.savedToWatchVideoList, $mainSearchResult);
  }

  handleClickDeleteButton(e) {
    const $videoItem = e.target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) {
      return;
    }
    this.deleteVideo(videoId);
    $mainVideoList.replaceChildren();
    if ($mainVideoList.classList.contains('watched-video-list')) {
      renderVideoItems(StateController.savedWatchedVideoList, $mainSearchResult);
      return;
    }
    renderVideoItems(StateController.savedToWatchVideoList, $mainSearchResult);
  }

  handleClickWatchedButton() {
    if ($mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    $('.nav__no-watched-button').classList.remove('button-active');
    $('.nav__watched-button').classList.add('button-active');
    $mainVideoList.classList.add('watched-video-list');
    $mainVideoList.replaceChildren();
    const videos = StateController.savedWatchedVideoList;

    if (videos.length === 0) {
      $mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    renderVideoItems(videos, $mainSearchResult);
    $mainSearchResult.classList.remove('search-result--no-result');
  }

  handleClickNoWatchedButton() {
    if (!$mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    $('.nav__no-watched-button').classList.add('button-active');
    $('.nav__watched-button').classList.remove('button-active');
    $mainVideoList.classList.remove('watched-video-list');
    $mainVideoList.replaceChildren();
    const videos = StateController.savedToWatchVideoList;

    if (videos.length === 0) {
      $mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    renderVideoItems(videos, $mainSearchResult);
    $mainSearchResult.classList.remove('search-result--no-result');
  }

  openModal() {
    const $modalContainer = $('.modal-container');
    $modalContainer.classList.toggle('hide');
  }

  closeModal() {
    $searchKeyWordInput.value = '';
    $modalSearchResult.classList.remove('search-result--no-result');
    $modalVideoList.replaceChildren();
    $('.modal-container').classList.add('hide');
    if ($mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    if (StateController.savedToWatchVideoList.length === 0) {
      $mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    $mainSearchResult.classList.remove('search-result--no-result');
    $mainVideoList.replaceChildren();
    renderVideoItems(StateController.savedToWatchVideoList, $mainSearchResult);
  }
}

const mainPage = new MainPage();
mainPage.init();
