import { EXCEPTION_MESSAGE } from '../../constant.js';
import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';

export default class NotFound extends Component {
  template() {
    const { statusCode } = rootStore.state.status;

    return `
      <h3 hidden>검색 결과</h3>
        <img src="./src/assets/images/not_found.png" alt="no result image" class="no-result__image">
        <p class="no-result__description">
        ${EXCEPTION_MESSAGE[statusCode] || 'Sorry, Something went wrong'}
        </p>
    `;
  }
}
