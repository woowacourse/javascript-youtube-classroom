import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { EVENT_TYPE, PAGE_NAME } from '@Constants';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import UIStore from '@Domain/UIStore';
import notSavedImage from '@Images/not_saved.jpeg';

export default class MainContents {
  constructor() {
    this.container = $('#main-contents');
    this.$videoList = createElement('UL', { className: 'library__list', id: 'saved-video-list' });
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
    const { videoId } = $target.closest('.saved-video-item').dataset;
    if (confirm('정말 지우시겠습니까?')) {
      YoutubeSaveStorage.removeVideo(videoId);
    }
  };

  handleToggleWatched = ({ target: $target }) => {
    const { videoId } = $target.closest('.saved-video-item').dataset;
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
      : $fragment.append(this.getVideoList(list));

    this.container.append($fragment);
  };

  getVideoList(videos) {
    const $listElements = videos.map(({ id, videoData }) => {
      const { videoTitle, videoChanneltitle, videoPublishtime, videoThumbnail } = videoData;
      return createElement('LI', {
        dataset: { 'video-id': id },
        className: 'saved-video-item',
        innerHTML: `<img
        src="${videoThumbnail}"
        alt="video-item-thumbnail" class="video-item__thumbnail"
        loading="lazy"
        >
      <h4 class="video-item__title">${videoTitle}</h4>
      <p class="video-item__channel-name">${videoChanneltitle}</p>
      <p class="video-item__published-date">${getParsedTime(videoPublishtime)}</p>
      <button id="toggle-watched-button">✅</button>
      <button id="remove-video-button">🗑️</button>
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
