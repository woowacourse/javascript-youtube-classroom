import { INTERSECTION_RATIO, MESSAGE, STORAGE_KEY } from '../constants';
import { $, showSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';
import { store } from '../domain/store';
import { requestApi } from '../domain/requestApi';
import { convertToKoreaLocaleDate } from '../utils/common';
import { skeletonUI } from './skeletonUI';
import { video } from '../domain/video';

export const youtubeSearchResult = {
  $videoList: $('.video-list'),

  searchResultTemplate(items) {
    const saveDatas = store.getLocalStorage(STORAGE_KEY);
    const resultTemplate = items
      .map(item => {
        const { publishedAt, channelId, title, thumbnails, channelTitle } = item.snippet;
        return `
          <li class="video-item">
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
              <img
                src=${thumbnails.high.url}
                alt="video-item-thumbnail" class="video-item__thumbnail">
            </a>
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
              <h4 class="video-item__title">${title}</h4>
            </a>
            <a href="https://www.youtube.com/channel/${channelId}" target="_blank"><p class="video-item__channel-name">${channelTitle}</p></a>
            <p class="video-item__published-date">
              ${convertToKoreaLocaleDate(publishedAt)}
            </p>
            <button class="video-item__save-button button" data-video-id=${item.id.videoId} ${
          saveDatas.includes(item.id.videoId) ? 'hidden' : ''
        }>⬇ 저장</button>
          </li>`;
      })
      .join('');

    return resultTemplate;
  },

  noSearchResultTemplate() {
    return `
      <div class="no-result">
        <img class="no-result__image"
          src=${NoResultImage}
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
    this.addSaveButtonClickEvent();

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

    requestApi($('#search-input-keyword').value, nextPageToken)
      .then(videoData => {
        skeletonUI.remove();
        this.$videoList.insertAdjacentHTML('beforeend', this.searchResultTemplate(videoData.items));

        if (videoData && videoData.nextPageToken) {
          this.scrollObserver(videoData.nextPageToken);
        }
      })
      .catch(async ({ message }) => {
        showSnackBar(message);
      });
  },

  addSaveButtonClickEvent() {
    this.$videoList.addEventListener('click', e => {
      if (e.target.classList.contains('video-item__save-button')) {
        const videoId = e.target.dataset.videoId;
        video.save(videoId);
        e.target.setAttribute('hidden', true);
      }
    });
  },

  scrollObserver(nextPageToken) {
    const $li = $('li:last-child');
    const intersectionObserver = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          intersectionObserver.unobserve($li);
          this.renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: INTERSECTION_RATIO,
      },
    );

    intersectionObserver.observe($li);
  },

  resetVideoList() {
    this.$videoList.replaceChildren();
  },
};
