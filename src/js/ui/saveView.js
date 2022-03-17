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
      newVideo: {
        videoId: parentTarget.dataset.videoId,
        videoThumbnail: parentTarget.querySelector('.video-item__thumbnail').src,
        videoChannelTitle: parentTarget.querySelector('.video-item__channel-name').innerText,
        videoTitle: parentTarget.querySelector('.video-item__title').innerText,
        videoDate: parentTarget.querySelector('.video-item__published-date').innerText,
      },
    });
  }
}

export default SaveView;
