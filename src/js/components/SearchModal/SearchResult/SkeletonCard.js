import Component from '../../../core/Component.js';

export default class SkeletonCard extends Component {
  template() {
    return `
      <li class="video-item">
        <div class="video-item__thumbnail"></div>
        <h4 class="video-item__title line"></h4>
        <p class="video-item__channel-name line"></p>
        <p class="video-item__published-date line"></p>
        <button class="video-item__save-button button"></button>
      </li>
  `;
  }
}
