import { convertDOMToSaveObject } from '../util/converter';
import { emit, on } from '../util/event';
import template from './templates';

class MainView {
  constructor(afterWatchVideoList, watchedVideoList, nav) {
    this.$afterWatchVideoList = afterWatchVideoList;
    this.$watchedVideoList = watchedVideoList;
    this.$nav = nav;
    this.bindEvents();
  }

  bindEvents() {
    on(this.$nav, 'click', this.onClickNavButton.bind(this));
    on(this.$afterWatchVideoList, 'click', this.onClickStatusButton.bind(this));
  }

  onClickNavButton({ target }) {
    if (target.id !== 'after-watch-video-button' && target.id !== 'watched-video-button') {
      return;
    }
    this.togglePage();
  }

  onClickStatusButton({ target }) {
    if (target.classList.contains('watch-video-button')) {
      const parentTarget = target.closest('section');

      this.$watchedVideoList.append(parentTarget);
      emit(this.$afterWatchVideoList, '@watched', {
        watchedVideo: convertDOMToSaveObject(parentTarget),
      });
      emit(this.$afterWatchVideoList, '@delete', { id: parentTarget.dataset.videoId });
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

  togglePage() {
    this.$afterWatchVideoList.classList.toggle('hide');
    this.$watchedVideoList.classList.toggle('hide');
  }
}

export default MainView;
