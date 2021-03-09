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
import { decreaseSavedVidoCount } from '../../redux/action.js';

export default class VideoList extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
    this.filter = 'watchLater';

    const options = {
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver(this.callback, options);
  }

  callback(entries, observer) {
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

  lazyLoad(targets) {
    targets.forEach((target) => this.observer.observe(target));
  }

  initRender() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    const fragment = document.createDocumentFragment();
    if (Object.keys(savedVideos).length > 0) {
      Object.keys(savedVideos).forEach((videoId) => {
        fragment.appendChild(
          new Video({
            videoId,
            videoTitle: savedVideos[videoId].videoTitle,
            channelTitle: savedVideos[videoId].channelTitle,
            channelId: savedVideos[videoId].channelId,
            publishedAt: savedVideos[videoId].publishedAt,
            thumbnailURL: savedVideos[videoId].thumbnailURL,
            watched: savedVideos[videoId].watched,
          }).createTemplate('management')
        );
      });
    }

    const snackBar = createElement({ tag: 'div' });
    snackBar.id = 'snackbar';

    this.$target.appendChild(fragment);
    this.$target.appendChild(snackBar);

    const notSavedVideoMessage = createElement({
      tag: 'h2',
      classes: ['not-saved-video-message'],
      textContent: '저장된 비디오가 없습니다.',
    });

    // TODO: 비디오가 저장되면 메시지 지우기, 비디오가 삭제되고 저장된 비디오가 없으면 메시지 띄우기
    Object.keys(savedVideos).length !== 0
      ? notSavedVideoMessage.classList.add('d-none')
      : '';

    this.$target.appendChild(notSavedVideoMessage);
  }

  selectDOM() {
    this.$snackbar = $('#snackbar');
  }

  setFilter(filter) {
    if (this.filter !== filter) {
      // TODO: 다른 메서드로 빼기
      $$('.clip', this.$target).forEach(($clip) => {
        $clip.classList.toggle('d-none');
      });

      if (filter === 'watchLater') {
        const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
        const watchLaterVideos = Object.keys(savedVideos).filter(
          (videoId) => savedVideos[videoId].watched === false
        );
        if (watchLaterVideos.length === 0) {
          $('.not-saved-video-message').classList.remove('d-none');
        } else {
          $('.not-saved-video-message').classList.add('d-none');
        }
      }

      if (filter === 'watched') {
        const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
        const watchedVideos = Object.keys(savedVideos).filter(
          (videoId) => savedVideos[videoId].watched === true
        );
        if (watchedVideos.length === 0) {
          $('.not-saved-video-message').classList.remove('d-none');
        } else {
          $('.not-saved-video-message').classList.add('d-none');
        }
      }
    }
    this.filter = filter ?? 'watchLater';
  }

  showByFilter() {
    if (this.filter === 'watchLater') {
      const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
      const watchLaterVideos = Object.keys(savedVideos).filter(
        (videoId) => savedVideos[videoId].watched === false
      );
      if (watchLaterVideos.length === 0) {
        $('.not-saved-video-message').classList.remove('d-none');
        return;
      }
    }

    if (this.filter === 'watched') {
      const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
      const watchedVideos = Object.keys(savedVideos).filter(
        (videoId) => savedVideos[videoId].watched === true
      );
      if (watchedVideos.length === 0) {
        $('.not-saved-video-message').classList.remove('d-none');
        return;
      }
    }
  }

  render(preStates, states) {
    if (preStates.savedVideoCount !== states.savedVideoCount) {
      if (preStates.savedVideoCount > states.savedVideoCount) {
        this.showByFilter();
        return;
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

        this.observer.observe(newVideo);

        this.showByFilter();
      }
    }
  }

  onClickWatchedButton(event) {
    // 이거 할 때에도 렌더 되어야함...
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
    store.dispatch(decreaseSavedVidoCount());

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

    this.lazyLoad($$('.clip', this.$target));
  }
}
