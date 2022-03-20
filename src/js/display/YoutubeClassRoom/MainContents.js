import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime, filterVideoByStatus } from '@Utils/dataManager';
import { EVENT_TYPE, NAVIGATION, MESSAGE, SNACKBAR_TYPE, LIBRARY_ACTION } from '@Constants';
import LibraryStore from '@Store/LibraryStore';
import UIStore from '@Store/UIStore';
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
    LibraryStore.addSubscriber(this.render);
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
      LibraryStore.dispatch(LIBRARY_ACTION.REMOVE_VIDEO, videoId);
      SnackBar.open(MESSAGE.REMOVE_COMPLETE, SNACKBAR_TYPE.ALERT);
    }
  };

  handleToggleWatched = ({ target: $target }) => {
    const { videoId } = $target.closest('.list-item').dataset;
    LibraryStore.dispatch(LIBRARY_ACTION.TOGGLE_WATCH_STATUS, videoId);
  };

  render = () => {
    this.container.replaceChildren();
    this.$videoList.replaceChildren();

    const { selectedPage } = UIStore.getState();
    const { videoList } = LibraryStore.getState();
    const isWatched = selectedPage === NAVIGATION.WATCHED;
    const filteredVideoList = filterVideoByStatus(videoList, isWatched);
    const $fragment = document.createDocumentFragment();

    filteredVideoList.length === 0
      ? $fragment.append(this.getNoResults())
      : $fragment.append(this.getVideoList(filteredVideoList, isWatched));

    this.container.append($fragment);
  };

  getVideoList(videos, isWatched) {
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
        isWatched ? 'watched' : ''
      }" type="button"
      aria-label="toggle watch status"
      >✅</button>
      <button id="remove-video-button" class="list-item__remove-button" type="button" aria-label="delete video">🗑️</button>
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
