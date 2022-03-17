import { INTERSECTION_RATIO, MESSAGE, STORAGE_KEY } from '../constants';
import { $, showSnackBar } from '../utils/dom';
import NoResultImage from '../../assets/images/not_found.png';
import { store } from '../domain/store';
import { request } from '../domain/youtubeApi';
import { convertToKoreaLocaleDate } from '../utils/common';
import { skeleton } from './skeleton';
import { video } from '../domain/video';

export const result = {
  searchResultTemplate(items) {
    const saveDatas = store.getLocalStorage(STORAGE_KEY);
    const resultTemplate = items
      .map(item => {
        const { publishedAt, channelId, title, thumbnails, channelTitle } = item.snippet;
        return `
          <li class="video-item" data-video-id=${item.id.videoId}>
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
            <button class="video-item__save-button button" ${
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

  renderInitialVideoList(json) {
    this.addSaveButtonClickEvent();
    const $videoList = $('.video-list');

    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      json.items.length ? this.searchResultTemplate(json.items) : this.noSearchResultTemplate(),
    );

    if (json && json.nextPageToken) {
      this.scrollObserver(json.nextPageToken);
    }
  },

  renderNextVideoList(nextPageToken) {
    skeleton.renderSkeletonUI();

    request($('#search-input-keyword').value, nextPageToken)
      .then(json => {
        skeleton.removeSkeletonUI();
        $('.video-list').insertAdjacentHTML('beforeend', this.searchResultTemplate(json.items));

        if (json && json.nextPageToken) {
          this.scrollObserver(json.nextPageToken);
        }
      })
      .catch(async ({ message }) => {
        showSnackBar(message);
      });
  },

  addSaveButtonClickEvent() {
    $('.video-list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__save-button')) {
        video.save(e);
      }
    });
  },

  scrollObserver(nextPageToken) {
    const $li = $('li:last-child');
    const io = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          io.unobserve($li);
          this.renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: INTERSECTION_RATIO,
      },
    );

    io.observe($li);
  },

  resetVideoList() {
    $('.video-list').replaceChildren();
  },
};
