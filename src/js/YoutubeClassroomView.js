import { $ } from './util';

const videoListItemTemplate = ({ id, thumbnail, title, channelName, publishedDate }) => `
  <li class="video-item" data-video-id="${id}">
    <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelName}</p>
    <p class="video-item__published-date">${publishedDate}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>`;

export default class YoutubeClassRoomView {
  constructor() {
    this.isShownNoResult = false;
  }

  showSearchResultVideoList() {
    $('#no-result').classList.add('hide');
    $('#search-result-video-list').classList.remove('hide');
    $('#search-result').classList.remove('search-result--no-result');
    this.isShownNoResult = false;
  }

  showNoResult() {
    $('#no-result').classList.remove('hide');
    $('#search-result-video-list').classList.add('hide');
    $('#search-result').classList.add('search-result--no-result');
    this.isShownNoResult = true;
  }

  updateOnSearchDataReceived(videos) {
    if (videos.length === 0) {
      this.showNoResult();
      return;
    }
    if (this.isShownNoResult) {
      this.showSearchResultVideoList();
    }

    const listItems = videos.map((video) => videoListItemTemplate(video)).join('');
    $('#search-result-video-list').insertAdjacentHTML('beforeend', listItems);
  }

  initializeSearchResultVideoList() {
    $('#search-result-video-list').innerHTML = '';
  }
}
