import Component from '../../core/Component.js';
import notFoundImage from '../../../assets/images/not_found.png';

export default class NotFound extends Component {
  template() {
    return `
      <img src="${notFoundImage}" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        ${this.props.message}
      </p>
    `;
  }
}
