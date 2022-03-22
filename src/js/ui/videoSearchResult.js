import { INTERSECTION_RATIO, MESSAGE } from '../constants';
import { $, showSnackBar } from '../utils/dom';
import noResultImage from '../../assets/images/not_found.png';
import { requestVideoSearchApi } from '../domain/requestVideoSearchApi';
import { convertToKoreaLocaleDate } from '../utils/common';
import { skeletonUI } from './skeletonUI';
import { video } from '../domain/video';
import { classRoomVideo } from './classRoomVideo';

export const videoSearchResult = {
  $videoList: $('.video-list'),
  $searchInputKeyword: $('#search-input-keyword'),
  $willWatchVideoButton: $('#will-watch-video-button'),
  $watchedVideoButton: $('#watched-video-button'),

  searchResultTemplate(items) {
    const savedVideoList = video.getVideoList();
    const template = items
      .map(item => {
        const { publishedAt, title, thumbnails, channelTitle } = item.snippet;
        return `
          <li class="video-item modal-video-item">
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" 
            data-thumbnail-url=${thumbnails.medium.url}>
              <img
                src=${thumbnails.medium.url}
                alt="video-item-thumbnail" class="video-item__thumbnail"
                >
            </a>
            <a href="https://www.youtube.com/watch?v=${
              item.id.videoId
            }" target="_blank" data-title=${encodeURIComponent(title)}>
              <h4 class="video-item__title">${title}</h4>
            </a>
            <p class="video-item__channel-name" data-channel-title=${encodeURIComponent(channelTitle)} >${channelTitle}
            </p>
            <p class="video-item__published-date" data-published-date=${publishedAt}>
              ${convertToKoreaLocaleDate(publishedAt)}
            </p>
            <button class="video-item__save-button button" data-video-id=${item.id.videoId} ${
          savedVideoList.includes(item.id.videoId) ? 'hidden' : ''
        }>⬇ 저장</button>
          </li>`;
      })
      .join('');

    return template;
  },

  noSearchResultTemplate() {
    return `
      <div class="no-result">
        <img class="no-result__image"
          src=${noResultImage}
          alt="no-result-image"
        >
        <div class="no-result__description">
          <p>${MESSAGE.NOT_FOUND}</p>
          <p>${MESSAGE.OTHER_KEYWORD}</p>
        </div>
      </div>
    `;
  },

  renderInitialVideoList(videoData) {
    this.$videoList.replaceChildren();
    this.$videoList.insertAdjacentHTML(
      'beforeend',
      videoData.items.length ? this.searchResultTemplate(videoData.items) : this.noSearchResultTemplate(),
    );

    if (videoData && videoData.nextPageToken) {
      this.scrollObserver(videoData.nextPageToken);
    }
  },

  renderNextVideoList(nextPageToken) {
    skeletonUI.render();
    requestVideoSearchApi(this.$searchInputKeyword.value, nextPageToken)
      .then(videoData => {
        skeletonUI.remove();
        this.$videoList.insertAdjacentHTML('beforeend', this.searchResultTemplate(videoData.items));

        if (videoData && videoData.nextPageToken) {
          this.scrollObserver(videoData.nextPageToken);
        }
      })
      .catch(({ message }) => {
        skeletonUI.remove();
        showSnackBar(message);
      });
  },

  addSaveButtonClickEvent() {
    this.$videoList.addEventListener('click', this.handleSaveButtonClick.bind(this));
  },

  handleSaveButtonClick(e) {
    if (e.target.classList.contains('video-item__save-button')) {
      try {
        const datasetElementsArray = [...e.target.closest('.video-item').children].map(element => ({
          ...element.dataset,
        }));
        video.save(datasetElementsArray);
        e.target.setAttribute('hidden', true);
        classRoomVideo.resetVideoList();
        classRoomVideo.renderVideoList('notWatched');
        this.$willWatchVideoButton.classList.add('highlight');
        this.$watchedVideoButton.classList.remove('highlight');
        showSnackBar(MESSAGE.SAVE_SUCCESS);
      } catch ({ message }) {
        showSnackBar(message);
      }
    }
  },

  scrollObserver(nextPageToken) {
    const $currentLastChildLiElement = $('.modal-video-item:last-child');
    const intersectionObserver = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          intersectionObserver.unobserve($currentLastChildLiElement);
          this.renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: INTERSECTION_RATIO,
      },
    );

    intersectionObserver.observe($currentLastChildLiElement);
  },

  resetVideoList() {
    this.$videoList.replaceChildren();
  },
};
