import SearchModal from './searchModal';
import { $, hasProperty, randomErrorEmoji, requestYoutubeVideos } from './utils';
import NotFoundImage from '../assets/images/not_found.png';
import { SERVER_URL } from './constants/constant';
import VideoStorage from './storage/videoStorage';
import VideoItem from './videoItem';

export default class App {
  constructor() {
    this.storage = new VideoStorage();

    this.$modalContainer = $('.modal-container');
    this.$videoListContainer = $('#app > .saved-video-list-container');
    this.$videoList = $('.video-list', this.$videoListContainer);
    this.$videoListFilters = $('#app .video-list-filters');
    this.$noSavedVideo = $('#app > .no-saved-video');
    this.$errorEmoji = $('.error-emoji', this.$noSavedVideo);

    $('.search-modal').insertAdjacentHTML('beforeend', this.searchResultTemplate());
    $('#search-modal-button').addEventListener('click', this.openModal);
    $('.dimmer').addEventListener('click', this.closeModal);
    this.$videoList.addEventListener('click', this.handleClickVideoList);
    this.$videoListFilters.addEventListener('click', this.handleFilterClick);
    $('#app').addEventListener('keyup', this.handleKeyupEvent);

    const searchModal = new SearchModal(this.storage, this);
    searchModal.init();

    this.$errorEmoji.innerText = randomErrorEmoji();
    this.observeVideoListContainerForErrorEmoji();

    (async () => {
      const ids = Object.keys(this.storage.cache);
      const videoList = await this.requestVideos(ids);
      videoList && this.renderVideoItems(videoList);
    })();
  }

  searchResultTemplate() {
    return `
      <section class="search-result">
        <ul class="video-list grid col-sm-1 col-md-2 col-lg-3 col-xl-4" data-testid="video-list"></ul>
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
      <li class="video-item ${className}" data-video-id="${video.id}" data-testid="saved-video-item">
        <div class="video-container">
          <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${video.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h4 class="video-item__title">
          <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">${video.title}</a>
        </h4>
        <p class="video-item__channel-name">
          <a href="https://www.youtube.com/channel/${video.channelId}" target="_blank">
            ${video.channelTitle}
          </a>
        </p>
        <p class="video-item__published-date">
          <time datetime="${video.publishedAtAsDateTime}">${video.publishedAt}</time>
        </p>
        <div class="video-item__management">
          <button type="button" class="btn btn-square ${
            isWatched ? 'active' : ''
          }" for="status-change" data-testid="video-status-change-button">✅</button>
          <button type="button" class="btn btn-square" for="delete" data-testid="delete-video-button">🗑️</button>
        </div>
      </li>`;
  }

  renderVideoItems(videos) {
    const videoListTemplate = videos.map(video => this.videoItemTemplate(video)).join('');
    this.$videoList.insertAdjacentHTML('beforeend', videoListTemplate);
  }

  async requestVideos(ids) {
    const result = await requestYoutubeVideos(`${SERVER_URL}/youtube-videos`, {
      id: ids.join(','),
    });
    if (result === null) return null;
    const videos = result.items.map(item => {
      const { id } = item;
      const isWatched = hasProperty(this.storage.cache[id], 'watched');
      return new VideoItem(item, isWatched);
    });
    return videos;
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
    if (target.localName !== 'button') return;
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
    if (target.localName !== 'button') return;
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

  handleKeyupEvent = ({ key }) => {
    if (key !== 'Escape') return;
    if (this.$modalContainer.classList.contains('hide')) return;
    this.closeModal();
  };

  showErrorEmoji = () => {
    this.$errorEmoji.innerText = randomErrorEmoji();
    this.$noSavedVideo.classList.remove('hide');
  };

  observeVideoListContainerForErrorEmoji() {
    const observer = new MutationObserver(() => {
      this.$noSavedVideo.classList.add('hide');
      if (this.$videoList.children.length === 0) {
        return this.showErrorEmoji();
      }

      const noWatchedVideo = !!(
        this.$videoListContainer.classList.contains('visible-watched') &&
        !$('.video-item.video-item--watched', this.$videoList)
      );
      if (noWatchedVideo) {
        return this.showErrorEmoji();
      }

      const noWatchLaterVideo = !!(
        this.$videoListContainer.classList.contains('visible-watch-later') &&
        !$('.video-item.video-item--watch-later', this.$videoList)
      );
      return noWatchLaterVideo && this.showErrorEmoji();
    });
    observer.observe(this.$videoListContainer, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
}

new App();
