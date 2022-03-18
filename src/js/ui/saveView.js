import { convertDOMToSaveObject } from '../util/converter';
import { emit, on } from '../util/event';

class SaveView {
  constructor(target) {
    this.$target = target;

    this.bindEvents();
  }

  bindEvents() {
    on(this.$target, 'click', this.onClick.bind(this));
  }

  onClick({ target, currentTarget }) {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }
    target.classList.add('hide');

    const parentTarget = target.closest('li');
    emit(currentTarget, '@save', {
      newVideo: convertDOMToSaveObject(parentTarget),
    });
  }
}

export default SaveView;
