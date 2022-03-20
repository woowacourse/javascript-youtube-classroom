import Component from '../../core/Component.js';
import NotFoundImage from '../../../assets/images/not_found.png';

class NotFound extends Component {
  template() {
    return `
      <h3 hidden>검색 결과</h3>
      <img src="${NotFoundImage}" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        저장한 영상이 없습니다.
      </p>
    `;
  }
}

customElements.define('no-videos', NotFound);

export default NotFound;
