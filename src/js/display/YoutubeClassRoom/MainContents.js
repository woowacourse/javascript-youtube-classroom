import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { EVENT_TYPE, PAGE_NAME } from '@Constants';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import UIStore from '@Domain/UIStore';
import notSavedImage from '@Images/not_saved.jpeg';

export default class MainContents {
  constructor() {
    this.container = $('#main-contents');
    this.$videoList = $('#saved-video-list', this.container);
    UIStore.addSubscriber(this.render, ['selectedPage']);
    YoutubeSaveStorage.addSubscriber(this.render);
    this.render();
  }

  render = () => {
    this.$videoList.replaceChildren();
    const { selectedPage } = UIStore.getState();
    const list =
      selectedPage === PAGE_NAME.WATCH_LATER
        ? YoutubeSaveStorage.getWatchLaterList()
        : YoutubeSaveStorage.getWatchedList();
    const $fragment = document.createDocumentFragment();

    list.length === 0
      ? $fragment.append(this.getNoResults())
      : $fragment.append(...this.getVideoList(list));
    this.$videoList.append($fragment);
  };

  getVideoList(videos) {
    return videos.map(({ id, videoData }) => {
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
  }

  getNoResults() {
    return createElement('DIV', {
      className: 'no-result',
      innerHTML: `<img src="${notSavedImage}" alt="no save image" class="no-save__image">`,
    });
  }
}
