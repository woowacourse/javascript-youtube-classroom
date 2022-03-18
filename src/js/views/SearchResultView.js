import Template from './Template.js';
import { $, $$ } from '../utils/dom.js';
import { emit } from '../utils/event.js';
import getRelativeDate from '../utils/date.js';

export default class SearchResultView {
  constructor() {
    this.template = new Template();
    this.$videoList = $('.video-list');
    this.$searchTarget = $('.search-target');
    this.$searchNoResult = $('.search-result--no-result');

    this.observer = new IntersectionObserver(
      ([lastEntry]) => {
        if (lastEntry.isIntersecting) {
          emit(this.$searchTarget, '@scroll-bottom');
        }
      },
      {
        root: this.$videoList,
        threshold: 1.0,
      },
    );
  }

  renderVideo(newVideoItems) {
    this.$videoItems = $$('.skeleton');

    this.$videoItems.forEach(($item, idx) => {
      $('.video-item__thumbnail', $item).setAttribute(
        'srcdoc',
        this.template.getThumbnail(newVideoItems[idx].thumbnailUrl, newVideoItems[idx].videoId),
      );
      $item.classList.remove('skeleton');
      $('.video-item__title', $item).innerText = newVideoItems[idx].title;
      $('.video-item__channel-name', $item).innerText = newVideoItems[idx].channelTitle;
      $('.video-item__published-date', $item).innerText = getRelativeDate(newVideoItems[idx].publishTime);
      const $savedButton = $('.video-item__save-button', $item);
      $savedButton.innerText = newVideoItems[idx].saved ? '저장됨' : '⬇ 저장';
      $savedButton.classList.add(newVideoItems[idx].saved ? 'saved-button' : 'button');
      $savedButton.disabled = newVideoItems[idx].saved;
      $savedButton.addEventListener('click', this.handleSaveButton.bind(this));
      $savedButton.dataset.id = newVideoItems[idx].videoId;
    });
  }

  hideSkeleton() {
    $$('.skeleton').forEach((element) => {
      element.classList.add('hide');
    });
  }

  handleSaveButton(event) {
    const savedId = event.target.dataset.id;
    const buttonElement = event.target;
    emit(this.$searchTarget, '@save-video', { savedId, buttonElement });
  }

  changeSaveButtonStyle($savedButton) {
    $savedButton.disabled = true;
    $savedButton.textContent = '저장됨';
    $savedButton.classList.add('saved-button');
  }

  removeVideo() {
    this.$videoList.replaceChildren();
  }

  showSkeleton() {
    this.$videoList.insertAdjacentHTML('beforeend', this.template.getSkeleton());
  }

  startObserve() {
    this.observer.observe(this.$videoList.lastElementChild);
  }

  stopObserve() {
    this.observer.unobserve(this.$videoList.lastElementChild);
  }

  showNotFound() {
    this.$searchTarget.classList.add('hide');
    this.$searchNoResult.classList.remove('hide');
  }

  hideNotFound() {
    this.$searchTarget.classList.remove('hide');
    this.$searchNoResult.classList.add('hide');
  }
}
