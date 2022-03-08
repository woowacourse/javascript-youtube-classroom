import Component from '../../core/Component.js';

export default class NotFound extends Component {
  template() {
    return `
      <h3 hidden>검색 결과</h3>
      <div class="no-result">
        <img src="./src/assets/images/not_found.png" alt="no result image" class="no-result__image">
        <p class="no-result__description">
          검색 결과가 없습니다<br />
          다른 키워드로 검색해보세요
        </p>
      </div>
    `;
  }
}
