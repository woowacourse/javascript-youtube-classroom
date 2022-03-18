import { convertDOMToSaveObject } from '../util/converter';
import { emit, on } from '../util/event';
import template from './templates';

class MainView {
  constructor(afterWatchVideoList, watchedVideoList, nav) {
    this.$afterWatchVideoList = afterWatchVideoList;
    this.$watchedVideoList = watchedVideoList;
    this.$nav = nav;
    this.isWatchedPage = false;
    this.bindEvents();
  }

  bindEvents() {
    on(this.$nav, 'click', this.onClickNavButton.bind(this));
    on(this.$afterWatchVideoList, 'click', this.onClickStatusButton.bind(this));
    on(this.$watchedVideoList, 'click', this.onClickStatusButton.bind(this));
  }

  onClickNavButton({ target }) {
    if (target.id === 'after-watch-video-button') {
      this.moveAfterWatchVideoPage();
      emit(this.$nav, '@updatesaved', {});
      return;
    }
    if (target.id === 'watched-video-button') {
      this.moveWatchedVideoPage();
      emit(this.$nav, '@updatewatched', {});
    }
  }

  onClickStatusButton({ target }) {
    if (target.classList.contains('watch-video-button')) {
      const parentTarget = target.closest('section');

      parentTarget.remove();
      emit(this.$afterWatchVideoList, '@watched', {
        watchedVideo: convertDOMToSaveObject(parentTarget),
      });
      emit(this.$afterWatchVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }

    if (target.classList.contains('delete-watch-video-button')) {
      if (!confirm('정말로 삭제하시겠습니까?')) return;

      const parentTarget = target.closest('section');
      parentTarget.remove();
      if (this.isWatchedPage) {
        emit(this.$watchedVideoList, '@delete', { id: parentTarget.dataset.videoId });
        return;
      }
      emit(this.$afterWatchVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }

    if (target.classList.contains('after-watch-video-button')) {
      const parentTarget = target.closest('section');

      parentTarget.remove();

      emit(this.$watchedVideoList, '@afterwatch', {
        newVideo: convertDOMToSaveObject(parentTarget),
      });
      emit(this.$watchedVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }
  }

  renderItems(element, items) {
    element.replaceChildren();
    if (items.length > 0) {
      this.renderSavedItems(element, items);
      return;
    }

    this.renderNoItems(element);
  }

  renderSavedItems(element, items) {
    element.insertAdjacentHTML(
      'beforeend',
      template.afterWatchVideoItem(items, this.isWatchedPage),
    );
  }

  renderNoItems(element) {
    element.insertAdjacentHTML('beforeend', template.noAfterWatchItem());
  }

  moveAfterWatchVideoPage() {
    this.$afterWatchVideoList.classList.remove('hide');
    this.$watchedVideoList.classList.add('hide');
    this.isWatchedPage = false;
  }

  moveWatchedVideoPage() {
    this.$afterWatchVideoList.classList.add('hide');
    this.$watchedVideoList.classList.remove('hide');
    this.isWatchedPage = true;
  }
}

export default MainView;
