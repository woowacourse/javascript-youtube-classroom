import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { onObserveElement } from '@Utils/elementController';
import {
  YOUTUBE_SETTING,
  YOUTUBE_SEARCH_ACTION,
  MESSAGE,
  EVENT_TYPE,
  SNACKBAR_TYPE,
} from '@Constants';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import YoutubeSaveStorage from '@Domain/YoutubeSaveStorage';
import notFoundImage from '@Images/not_found.jpeg';
import SnackBar from '../Share/SnackBar';

export default class SearchResult {
  constructor() {
    this.container = $('#search-result');
    this.$videoList = $('#video-list', this.container);
    this.$tempFragment = document.createDocumentFragment();
    this.$scrollObserver = createElement('DIV', {
      id: 'search-result-scroll-observer',
    });
    this.$skeleton = Array.from({ length: YOUTUBE_SETTING.MAX_VIDEO_NUMBER }).map(() =>
      createElement('DIV', {
        className: 'skeleton',
        innerHTML: `
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      `,
      }),
    );
    this.bindEvents();
    YoutubeSearchStore.addSubscriber(this.render);
  }

  bindEvents() {
    onObserveElement(this.$scrollObserver, () => {
      const { isLoading, isEnded, error } = YoutubeSearchStore.getState();
      if (isLoading || isEnded || error) return;
      YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST);
    });
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '.video-item__save-button',
      handler: this.handleClickSaveButton,
    });
  }

  handleClickSaveButton = ({ target: $target }) => {
    try {
      const { videoId, videoTitle, videoChanneltitle, videoPublishtime, videoThumbnail } =
        $target.closest('.video-item').dataset;

      YoutubeSaveStorage.addVideo(videoId, {
        videoTitle,
        videoChanneltitle,
        videoPublishtime,
        videoThumbnail,
      });
      $target.classList.add('hide');
      SnackBar.open(MESSAGE.SAVE_COMPLETE, SNACKBAR_TYPE.ALERT);
    } catch (error) {
      SnackBar.open(error, SNACKBAR_TYPE.ERROR);
    }
  };

  render = () => {
    const { isLoading, isLoaded, items, isEnded, error } = YoutubeSearchStore.getState();
    this.$videoList.replaceChildren();
    if (error) {
      SnackBar.open(MESSAGE.SERVER_ERROR, SNACKBAR_TYPE.ERROR);
    }

    if (items.length <= 0 && isLoaded) {
      this.$videoList.append(this.getResultNotFound());
      return;
    }

    const $fragment = document.createDocumentFragment();
    if (items.length > 0) {
      $fragment.append(...this.getVideoList(items));
    }
    if (isLoading && !isEnded && !error) {
      $fragment.append(...this.$skeleton);
    }

    $fragment.append(this.$scrollObserver);
    this.$videoList.append($fragment);
  };

  getResultNotFound() {
    return createElement('IMG', {
      className: 'no-result__image',
      alt: 'no result image',
      src: notFoundImage,
    });
  }

  getVideoList(items) {
    return items.map(video => {
      const { videoId } = video.id;
      const { title, channelTitle, publishTime, thumbnails } = video.snippet;
      const isSaved = YoutubeSaveStorage.hasVideo(videoId);
      return createElement('LI', {
        dataset: {
          'video-id': videoId,
          'video-title': title,
          'video-channelTitle': channelTitle,
          'video-publishTime': publishTime,
          'video-thumbnail': thumbnails.medium.url,
        },
        className: 'video-item',
        innerHTML: `<img
          src="${thumbnails.medium.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail"
          loading="lazy"
          >
        <h4 class="video-item__title">${title}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${getParsedTime(publishTime)}</p>
        ${isSaved ? '' : '<button class="video-item__save-button button">⬇ 나중에 보기</button>'}`,
      });
    });
  }
}
