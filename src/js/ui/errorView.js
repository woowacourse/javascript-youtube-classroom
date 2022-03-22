import template from './templates';
import { ERROR_403 } from '../constant/index';

class ErrorView {
  constructor(target) {
    this.$target = target;
  }

  renderNetworkError(err) {
    if (err.name === ERROR_403) {
      this.$target.insertAdjacentHTML('beforeend', template.exceedCapacityErrorImage());
      return;
    }
    this.$target.insertAdjacentHTML('beforeend', template.responceFailedError());
  }
}

export default ErrorView;
