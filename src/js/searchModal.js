import $ from './utils/dom';
import VideoItem from './VideoItem';

class SearchModal {
  apikey = 'AIzaSyCr0ODcPGNBRByd4pZGQucF31LpqN1zGD0';

  baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  nextPageToken = null;

  constructor() {
    this.$modal = $('.search-modal');
    this.$input = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.$videoList = $('.video-list', this.$modal);
    this.addEvent();
  }

  // eslint-disable-next-line max-lines-per-function
  renderVideoItems(videos) {
    const videoItemTemplate = videos
      .map((video) => {
        console.log(video);
        return `<li class="video-item" data-video-id="${video.videoId}">
          <img
            src="${video.thumbnailUrl}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${video.publishedAt}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>`;
      })
      .join('');

    $('.video-list').insertAdjacentHTML('beforeend', videoItemTemplate);
  }

  addEvent() {
    this.$button.addEventListener('click', this.handleClickButton.bind(this));
  }

  async handleClickButton() {
    const title = this.$input.value;
    const jsonResult = await this.request(title);
    const videos = jsonResult.items.map(item => new VideoItem(item));
    this.renderVideoItems(videos);
  }

  async request(title) {
    const url = `${this.baseUrl}?part=snippet&maxResults=1&q=${title}&&key=${this.apikey}`;
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) {
        throw Error(response.statusText);
      }
      return json; // *** 응답결과
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default SearchModal;
