import { emit, on } from '../util/event';
import template from './templates';

class MainView {
  constructor(afterWatchVideoList, watchedVideoList) {
    this.$afterWatchVideoList = afterWatchVideoList;
    this.$watchedVideoList = watchedVideoList;
    this.bindEvents();
  }

  bindEvents() {
    on(this.$afterWatchVideoList, 'click', this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.classList.contains('watch-video-button')) {
      this.$watchedVideoList.append(target.closest('section'));
    }

    if (target.classList.contains('delete-watch-video-button')) {
      if (!confirm('정말로 삭제하시겠습니까?')) return;

      const parentTarget = target.closest('section');
      parentTarget.remove();

      emit(this.$afterWatchVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }
  }

  renderItems(savedItems) {
    this.$afterWatchVideoList.replaceChildren();
    if (savedItems.length > 0) {
      this.renderSavedItems(savedItems);
      return;
    }

    this.renderNoItems();
  }

  renderSavedItems(savedItems) {
    this.$afterWatchVideoList.insertAdjacentHTML(
      'beforeend',
      template.afterWatchVideoItem(savedItems),
    );
  }

  renderNoItems() {
    this.$afterWatchVideoList.insertAdjacentHTML('beforeend', template.noAfterWatchItem());
  }
}

export default MainView;
