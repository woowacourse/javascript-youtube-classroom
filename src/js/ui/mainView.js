import { CONFIRM_MESSAGE } from '../constant';
import { convertDOMToSaveObject } from '../util/converter';
import { emit, on } from '../util/event';
import template from './templates';

class MainView {
  constructor({ watchLaterVideoList, watchedVideoList, nav }) {
    this.$watchLaterVideoList = watchLaterVideoList;
    this.$watchedVideoList = watchedVideoList;
    this.$nav = nav;
    this.$nav.children[0].classList.add('selected');
    this.isWatchedPage = false;
    this.bindEvents();
  }

  bindEvents() {
    on(this.$nav, 'click', this.onClickNavButton.bind(this));
    on(this.$watchLaterVideoList, 'click', this.onClickStatusButton.bind(this));
    on(this.$watchedVideoList, 'click', this.onClickStatusButton.bind(this));
  }

  onClickNavButton({ target }) {
    this.checkClickwatchLaterNavbarButton(target);
    this.checkClickWatchedVideoNavbarButton(target);
  }

  checkClickwatchLaterNavbarButton(target) {
    if (target.id === 'watch-later-video-button') {
      this.showWatchLaterVideoPage();
      target.classList.add('selected');
      this.$nav.children[1].classList.remove('selected');
      emit(this.$nav, '@updatesaved');
    }
  }

  checkClickWatchedVideoNavbarButton(target) {
    if (target.id === 'watched-video-button') {
      this.showWatchedVideoPage();
      target.classList.add('selected');
      this.$nav.children[0].classList.remove('selected');
      emit(this.$nav, '@updatewatched');
    }
  }

  onClickStatusButton({ target }) {
    this.checkClickWatchVideoButton(target);
    this.checkClickDeleteVideoButton(target);
    this.checkClickWatchLaterVideoButton(target);
  }

  checkClickWatchVideoButton(target) {
    if (target.classList.contains('watch-video-button')) {
      const parentTarget = target.closest('section');

      parentTarget.remove();
      emit(this.$watchLaterVideoList, '@watched', {
        watchedVideo: convertDOMToSaveObject(parentTarget),
      });
      emit(this.$watchLaterVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }
  }

  checkClickDeleteVideoButton(target) {
    if (target.classList.contains('delete-watch-video-button')) {
      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const parentTarget = target.closest('section');
      parentTarget.remove();
      if (this.isWatchedPage) {
        emit(this.$watchedVideoList, '@delete', { id: parentTarget.dataset.videoId });
        return;
      }
      emit(this.$watchLaterVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }
  }

  checkClickWatchLaterVideoButton(target) {
    if (target.classList.contains('watch-later-video-button')) {
      const parentTarget = target.closest('section');

      parentTarget.remove();

      emit(this.$watchedVideoList, '@watchlater', {
        newVideo: convertDOMToSaveObject(parentTarget),
      });
      emit(this.$watchedVideoList, '@delete', { id: parentTarget.dataset.videoId });
    }
  }

  renderItems(items) {
    const element = this.isWatchedPage ? this.$watchedVideoList : this.$watchLaterVideoList;
    element.replaceChildren();

    if (items.length <= 0) {
      this.renderEmptyItems(element);
      return;
    }

    if (this.isWatchedPage) {
      this.renderSavedItems(element, items);
      return;
    }

    this.renderSavedItems(element, items);
  }

  renderSavedItems(element, items) {
    element.insertAdjacentHTML(
      'beforeend',
      template.watchLaterVideoItem(items, this.isWatchedPage),
    );
  }

  renderEmptyItems(element) {
    element.insertAdjacentHTML('beforeend', template.emptyItem(this.isWatchedPage));
  }

  showWatchLaterVideoPage() {
    this.$watchLaterVideoList.classList.remove('hide');
    this.$watchedVideoList.classList.add('hide');
    this.isWatchedPage = false;
  }

  showWatchedVideoPage() {
    this.$watchLaterVideoList.classList.add('hide');
    this.$watchedVideoList.classList.remove('hide');
    this.isWatchedPage = true;
  }
}

export default MainView;
