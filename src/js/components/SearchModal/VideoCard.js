import Component from '../../core/Component.js';

export default class VideoCard extends Component {
  template() {
    return `
      <li class="video-item" data-video-id="">
        <img
          src=""
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title"></h4>
        <p class="video-item__channel-name"></p>
        <p class="video-item__published-date"></p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
    `;
  }
}
