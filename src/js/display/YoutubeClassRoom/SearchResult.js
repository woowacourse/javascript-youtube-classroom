import { $, addEvent, createElement } from '@Utils/dom';
import { getParsedTime } from '@Utils/dataManager';
import { onObserveElement } from '@Utils/elementController';
import {
  YOUTUBE_SETTING,
  YOUTUBE_SEARCH_ACTION,
  MESSAGE,
  EVENT_TYPE,
  SNACKBAR_TYPE,
  LIBRARY_ACTION,
} from '@Constants';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';
import LibraryStore from '@Domain/LibraryStore';
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
      selector: '.list-item__save-button',
      handler: this.handleClickSaveButton,
    });
  }

  handleClickSaveButton = ({ target: $target }) => {
    try {
      const { videoId, videoTitle, videoChanneltitle, videoPublishtime, videoThumbnail } =
        $target.closest('.list-item').dataset;
      LibraryStore.dispatch(LIBRARY_ACTION.SAVE_VIDEO, {
        id: videoId,
        videoData: {
          videoTitle,
          videoChanneltitle,
          videoPublishtime,
          videoThumbnail,
        },
        watched: false,
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
      const { videoList } = LibraryStore.getState();
      const isSaved = videoList.some(({ id }) => id === videoId);

      return createElement('LI', {
        dataset: {
          'video-id': videoId,
          'video-title': title,
          'video-channelTitle': channelTitle,
          'video-publishTime': publishTime,
          'video-thumbnail': thumbnails.medium.url,
        },
        className: 'list-item',
        innerHTML: `<img
          src="${thumbnails.medium.url}"
          alt="video-item-thumbnail" class="list-item__thumbnail"
          loading="lazy"
          >
        <h4 class="list-item__title">${title}</h4>
        <p class="list-item__channel-name">${channelTitle}</p>
        <p class="list-item__published-date">${getParsedTime(publishTime)}</p>
        ${
          isSaved
            ? ''
            : '<button class="list-item__save-button button" type="button" aria-label="save video">⬇ 저장</button>'
        }`,
      });
    });
  }
}
