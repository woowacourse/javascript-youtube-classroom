import Component from '../../core/Component.js';

class SkeletonCard extends Component {
  template() {
    return `
        <li class="video-item skeleton">
          <div class="video-item__thumbnail"></div>
          <h4 class="video-item__title line"></h4>
          <p class="video-item__channel-name line"></p>
          <p class="video-item__published-date line"></p>
          <div class="video-item__button-menu">
            <button class="video-item__save-button button"></button>
          </div>
        </li>
      `;
  }
}

customElements.define('skeleton-card', SkeletonCard);

export default SkeletonCard;
