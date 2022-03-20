import Component from '../../core/Component.js';
import NotFoundImage from '../../../assets/images/not_found.png';

class NotFound extends Component {
  template() {
    return `
      <h3 hidden>검색 결과</h3>
        <img src="${NotFoundImage}" alt="no result image" class="no-result__image">
        <p class="no-result__description">
          검색 결과가 없습니다<br />
          다른 키워드로 검색해보세요
        </p>
      
    `;
  }
}

customElements.define('not-found', NotFound);

export default NotFound;
