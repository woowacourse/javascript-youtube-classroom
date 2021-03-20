import { $ } from '../util/index.js';

export class Navigation {
  constructor({ savedVideo, handleOpenModal }) {
    this.$navigation = $('nav');
    this.$uncheckedButton = $('.js-unchecked-video-button');
    this.$checkedButton = $('.js-checked-video-button');
    this.$likedButton = $('.js-liked-video-button');
    this.savedVideo = savedVideo;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-unchecked-video-button')) {
        this.savedVideo.setState({ isChecked: false, isLiked: false });
        this.repaintButtonColor(target);

        return;
      }

      if (target.classList.contains('js-checked-video-button')) {
        this.savedVideo.setState({ isChecked: true, isLiked: false });

        this.repaintButtonColor(target);

        return;
      }

      if (target.classList.contains('js-liked-video-button')) {
        this.savedVideo.setState({ isChecked: false, isLiked: true });
        this.repaintButtonColor(target);

        return;
      }
      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();
        return;
      }
    });
  }

  repaintButtonColor(element) {
    this.$uncheckedButton.classList.remove('bg-cyan-100');
    this.$checkedButton.classList.remove('bg-cyan-100');
    this.$likedButton.classList.remove('bg-cyan-100');
    element.classList.add('bg-cyan-100');
  }
}
