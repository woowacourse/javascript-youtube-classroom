import Template from './Template.js';
import { $, $$ } from '../utils/dom.js';
import { emit } from '../utils/event.js';

export default class SearchResultView {
  constructor() {
    this.$modalContainer = $('.modal-container');
    this.$videoList = $('.video-list');
    this.template = new Template();
    this.$searchTarget = $('#search-target');
    this.$searchNoResult = $('#search-no-result');

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
    if (newVideoItems.length < 10) {
      const haveToDeleteSkeletonCount = 10 - newVideoItems.length;
      this.deleteSkeleton(haveToDeleteSkeletonCount);
    }
    this.$videoItems = $$('.skeleton');
    this.$videoItems.forEach(($item, idx) => {
      $item.classList.remove('skeleton');
      $('.video-item__thumbnail', $item).setAttribute(
        'srcdoc',
        this.template.getThumbnail(newVideoItems[idx].thumbnailUrl, newVideoItems[idx].videoId),
      );
      $('.video-item__title', $item).innerText = newVideoItems[idx].title;
      $('.video-item__channel-name', $item).innerText = newVideoItems[idx].channelTitle;
      $('.video-item__published-date', $item).innerText = newVideoItems[idx].publishTime;
      $('.video-item__save-button', $item).innerText = newVideoItems[idx].saved ? '저장됨' : '⬇ 저장';
      $('.video-item__save-button', $item).classList.add(newVideoItems[idx].saved ? 'saved-button' : 'button');
      $('.video-item__save-button', $item).disabled = newVideoItems[idx].saved;
      $('.video-item__save-button', $item).addEventListener('click', this.handleSaveButton.bind(this));
      $('.video-item__save-button', $item).dataset.id = newVideoItems[idx].videoId;
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

  deleteSkeleton(haveToDeleteSkeletonCount) {
    while (haveToDeleteSkeletonCount) {
      this.$videoList.removeChild(this.$videoList.firstElementChild);
      haveToDeleteSkeletonCount -= 1;
    }
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

  hideModal() {
    this.$modalContainer.classList.add('hide');
  }
}
