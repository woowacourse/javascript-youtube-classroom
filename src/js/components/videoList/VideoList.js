import Component from '../../core/Component.js';
import Video from '../../model/Video.js';
import {
  $,
  $$,
  localStorageGetItem,
  localStorageSetItem,
  createElement,
} from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../../constants/constants.js';
import { store } from '../../index.js';
import { decreaseSavedVideoCount } from '../../redux/action.js';

export default class VideoList extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
    this.filter = 'watchLater';

    const options = {
      threshold: 0.5,
    };
    this.iframeLoadObserver = new IntersectionObserver(
      this.loadIframe,
      options
    );
  }

  loadIframe(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = $('iframe', entry.target);
        const src = video.getAttribute('data-src');
        const srcdoc = video.getAttribute('data-srcdoc');

        video.setAttribute('src', src);
        video.setAttribute('srcdoc', srcdoc);
        observer.unobserve(entry.target);
      }
    });
  }

  setLazyloading() {
    const clips = $$('.clip', this.$target);
    clips.forEach((clip) => this.iframeLoadObserver.observe(clip));
  }

  initRender() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    const fragment = document.createDocumentFragment();

    if (Object.keys(savedVideos).length > 0) {
      Object.keys(savedVideos).forEach((videoId) => {
        fragment.appendChild(
          new Video({
            videoId,
            ...savedVideos[videoId],
          }).createTemplate('management')
        );
      });
    }

    const snackBar = createElement({ tag: 'div' });
    snackBar.id = 'snackbar';

    const notSavedVideoMessage = createElement({
      tag: 'h2',
      classes: ['not-saved-video-message'],
      textContent: '저장된 비디오가 없습니다.',
    });

    fragment.appendChild(snackBar);
    fragment.appendChild(notSavedVideoMessage);
    this.$target.appendChild(fragment);

    this.showByFilter();
    this.setLazyloading();
  }

  selectDOM() {
    this.$snackbar = $('#snackbar');
  }

  setFilter(filter = 'watchLater') {
    if (this.filter === filter) return;
    // TODO: 다른 메서드로 빼기
    $$('.clip', this.$target).forEach(($clip) => {
      $clip.classList.toggle('d-none');
    });

    this.filter = filter;
    this.showByFilter();
  }

  showByFilter() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    const watchedVideos = Object.keys(savedVideos).filter(
      (videoId) => savedVideos[videoId].watched === (this.filter === 'watched')
    );
    watchedVideos.length === 0
      ? $('.not-saved-video-message').classList.remove('d-none')
      : $('.not-saved-video-message').classList.add('d-none');
  }

  render(preStates, states) {
    if (preStates.savedVideoCount > states.savedVideoCount) {
      this.showByFilter();
    }

    if (preStates.savedVideoCount < states.savedVideoCount) {
      const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
      const lastestVideoId = Object.keys(savedVideos)[
        Object.keys(savedVideos).length - 1
      ];

      const newVideo = new Video({
        videoId: lastestVideoId,
        ...savedVideos[lastestVideoId],
      }).createTemplate('management');

      if (this.filter === 'watched') {
        newVideo.classList.add('d-none');
      }

      this.$target.appendChild(newVideo);

      this.iframeLoadObserver.observe(newVideo);

      this.showByFilter();
    }
  }

  onClickWatchedButton(event) {
    const clip = event.target.closest('.clip');
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    savedVideos[clip.dataset.videoId].watched = !savedVideos[
      clip.dataset.videoId
    ].watched;
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    clip.classList.toggle('d-none');

    this.showByFilter();
  }

  onClickDeleteButton(event) {
    const clip = event.target.closest('.clip');
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    if (
      !(
        confirm('정말로 삭제하시겠습니까?') && savedVideos[clip.dataset.videoId]
      )
    ) {
      throw new Error('삭제에 실패했습니다.');
    }
    delete savedVideos[clip.dataset.videoId];
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    store.dispatch(decreaseSavedVideoCount());

    clip.remove();
  }

  showSnackBar(text) {
    this.$snackbar.textContent = text;
    this.$snackbar.classList.toggle('show');
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
    }, 3000);
  }

  // TODO: 좀 더 Object literal로 바꾸기
  bindEvent() {
    this.$target.addEventListener('click', (event) => {
      try {
        if (event.target.classList.contains('watched-button')) {
          this.onClickWatchedButton(event);
          this.showSnackBar('설정이 완료되었습니다.');
        } else if (event.target.classList.contains('delete-button')) {
          this.onClickDeleteButton(event);
          this.showSnackBar('정상적으로 삭제되었습니다.');
        }
      } catch (error) {
        this.showSnackBar(error.message);
      }
    });
  }
}
