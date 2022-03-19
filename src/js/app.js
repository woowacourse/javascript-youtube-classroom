import SearchModal from './searchModal';
import { $, hasProperty } from './utils';
import NotFoundImage from '../assets/images/not_found.png';
import {
  LOCAL_STORAGE_VIDEO_LIST_KEY,
  MAX_SAVABLE_VIDEOS_COUNT,
  SERVER_URL,
} from './constants/constant';
import VideoStorage from './storage/videoStorage';
import VideoItem from './videoItem';

export default class App {
  constructor() {
    this.storage = new VideoStorage(LOCAL_STORAGE_VIDEO_LIST_KEY, MAX_SAVABLE_VIDEOS_COUNT);

    this.$modalContainer = $('.modal-container');
    this.$videoListContainer = $('#app > .saved-video-list-container');
    this.$videoList = $('.video-list', this.$videoListContainer);
    this.$videoListFilters = $('#app .video-list-filters');

    $('.search-modal').insertAdjacentHTML('beforeend', this.searchResultTemplate());
    $('#search-modal-button').addEventListener('click', this.openModal);
    $('.dimmer').addEventListener('click', this.closeModal);
    this.$videoList.addEventListener('click', this.handleClickVideoList);
    this.$videoListFilters.addEventListener('click', this.handleFilterClick);

    const searchModal = new SearchModal(this.storage, this);
    searchModal.init();

    const videoSet = this.storage.cache;
    const ids = Object.keys(videoSet);

    (async () => {
      const videoList = await this.requestVideos(ids);
      videoList && this.renderVideoItems(videoList);
    })();
  }

  searchResultTemplate() {
    return `
      <section class="search-result">
        <div class="container">
          <ul class="video-list grid col-sm-1 col-md-2 col-lg-3 col-xl-4"></ul>
        </div>
        <div class="no-result">
          <img src="${NotFoundImage}" alt="no result image" class="no-result__image">
          <p class="no-result__description">
            검색 결과가 없습니다<br />
            다른 키워드로 검색해보세요
          </p>
        </div>
      </section>`;
  }

  videoItemTemplate(video) {
    const isWatched = this.storage.cache[video.id].watched;
    const className = isWatched ? 'video-item--watched' : 'video-item--watch-later';
    return `
      <li class="video-item ${className}" data-video-id="${video.id}">
        <img
          src="${video.thumbnailUrl}"
          alt="video-item-thumbnail" class="video-item__thumbnail" />
        <h4 class="video-item__title">${video.title}</h4>
        <p class="video-item__channel-name">${video.channelTitle}</p>
        <p class="video-item__published-date">${video.publishedAt}</p>
        <div class="video-item__management">
          <button type="button" class="btn btn-square ${
            isWatched ? 'active' : ''
          }" for="status-change">✅</button>
          <button type="button" class="btn btn-square" for="delete">🗑️</button>
        </div>
      </li>`;
  }

  renderVideoItems(videos) {
    const videoListTemplate = videos.map(video => this.videoItemTemplate(video)).join('');
    this.$videoList.insertAdjacentHTML('beforeend', videoListTemplate);
  }

  async requestVideos(ids) {
    const idsWithComma = ids.join(',');
    const url = new URL(`${SERVER_URL}/youtube-videos`);
    const parameters = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: 2,
      regionCode: 'kr',
      safeSearch: 'strict',
      id: idsWithComma,
    });
    url.search = parameters.toString();

    try {
      const response = await fetch(url);
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error.message);
      }
      const videos = body.items.map(item => {
        const { id } = item;
        const isWatched = hasProperty(this.storage.cache[id], 'watched');
        return new VideoItem(item, isWatched);
      });
      return videos;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  closeModal = () => {
    $('#search-input-keyword').value = '';
    $('.search-result').classList.remove('search-result--no-result');
    $('.search-result .video-list').replaceChildren();
    this.$modalContainer.classList.add('hide');
  };

  openModal = () => {
    this.$modalContainer.classList.toggle('hide');
  };

  handleFilterClick = ({ target }) => {
    if (target.tagName.toLowerCase() !== 'button') return;
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      const filter = target.getAttribute('for');
      this.$videoListContainer.classList.remove(`visible-${filter}`);
      return;
    }
    [...target.parentElement.children].forEach(e => {
      const filter = e.getAttribute('for');
      this.$videoListContainer.classList.remove(`visible-${filter}`);
      e.classList.remove('active');
    });
    target.classList.add('active');
    const filter = target.getAttribute('for');
    this.$videoListContainer.classList.add(`visible-${filter}`);
  };

  handleClickVideoList = ({ target }) => {
    if (target.tagName.toLowerCase() !== 'button') return;
    const purpose = target.getAttribute('for');
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    if (purpose === 'status-change') {
      target.classList.toggle('active');
      const isWatched = this.storage.cache[videoId].watched;
      if (isWatched) {
        $videoItem.classList.remove('video-item--watched');
        $videoItem.classList.add('video-item--watch-later');
      } else {
        $videoItem.classList.remove('video-item--watch-later');
        $videoItem.classList.add('video-item--watched');
      }
      this.storage.toggleWatchStatus(videoId);
    } else if (purpose === 'delete') {
      const result = window.confirm('해당 영상을 삭제하시겠습니까?');
      if (!result) return;
      this.storage.removeVideo(videoId);
      $videoItem.remove();
    }
  };

  handleSaveVideo = async videoId => {
    const videoList = await this.requestVideos([videoId]);
    videoList && this.renderVideoItems(videoList);
  };
}

new App();
