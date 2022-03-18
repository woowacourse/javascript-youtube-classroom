import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { EVENT_TYPE, PAGE_NAME, MESSAGE, SNACKBAR_TYPE } from '@Constants';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import UIStore from '@Domain/UIStore';
import notSavedImage from '@Images/not_saved.jpeg';
import SnackBar from '../Share/SnackBar';

export default class MainContents {
  constructor() {
    this.container = $('#main-contents');
    this.$videoList = createElement('UL', {
      className: 'classroom-main__list',
      id: 'saved-video-list',
    });
    UIStore.addSubscriber(this.render, ['selectedPage']);
    YoutubeSaveStorage.addSubscriber(this.render);
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '#remove-video-button',
      handler: this.handleClickRemoveButton,
    });
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '#toggle-watched-button',
      handler: this.handleToggleWatched,
    });
  }

  handleClickRemoveButton = ({ target: $target }) => {
    const { videoId } = $target.closest('.list-item').dataset;
    if (confirm(MESSAGE.CONFIRM_REMOVE_VIDEO)) {
      YoutubeSaveStorage.removeVideo(videoId);
      SnackBar.open(MESSAGE.REMOVE_COMPLETE, SNACKBAR_TYPE.ALERT);
    }
  };

  handleToggleWatched = ({ target: $target }) => {
    const { videoId } = $target.closest('.list-item').dataset;
    YoutubeSaveStorage.toggleVideoWatchStatus(videoId);
  };

  render = () => {
    this.container.replaceChildren();
    this.$videoList.replaceChildren();

    const { selectedPage } = UIStore.getState();
    const list =
      selectedPage === PAGE_NAME.WATCH_LATER
        ? YoutubeSaveStorage.getWatchLaterList()
        : YoutubeSaveStorage.getWatchedList();
    const $fragment = document.createDocumentFragment();

    list.length === 0
      ? $fragment.append(this.getNoResults())
      : $fragment.append(this.getVideoList(list, selectedPage === PAGE_NAME.WATCHED));

    this.container.append($fragment);
  };

  getVideoList(videos, watched) {
    const $listElements = videos.map(({ id, videoData }) => {
      const { videoTitle, videoChanneltitle, videoPublishtime, videoThumbnail } = videoData;
      return createElement('LI', {
        dataset: { 'video-id': id },
        className: 'list-item',
        innerHTML: `<img
        src="${videoThumbnail}"
        alt="video-item-thumbnail" class="list-item__thumbnail"
        loading="lazy"
        >
      <h4 class="list-item__title">${videoTitle}</h4>
      <p class="list-item__channel-name">${videoChanneltitle}</p>
      <p class="list-item__published-date">${getParsedTime(videoPublishtime)}</p>
      <button id="toggle-watched-button" class="list-item__toggle-button ${
        watched ? 'watched' : ''
      }" type="button">✅</button>
      <button id="remove-video-button" class="list-item__remove-button" type="button">🗑️</button>
     `,
      });
    });
    this.$videoList.append(...$listElements);
    return this.$videoList;
  }

  getNoResults() {
    return createElement('IMG', {
      className: 'no-save__image',
      alt: 'no save image',
      src: notSavedImage,
    });
  }
}
