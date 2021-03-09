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
    // if (entries.length === 0) {
    //   observer.disconnect();
    // }

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
    // const callback = (entries, observer) => {
    //   // if (entries.length === 0) {
    //   //   observer.disconnect();
    //   // }

    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       const video = $('iframe', entry.target);
    //       const src = video.getAttribute('data-src');
    //       const srcdoc = video.getAttribute('data-srcdoc');

    //       video.setAttribute('src', src);
    //       video.setAttribute('srcdoc', srcdoc);

    //       observer.unobserve(entry.target);
    //     }
    //   });
    // };

    // const options = {
    //   threshold: 0.5,
    // };

    // const io = new IntersectionObserver(callback, options);

    targets.forEach((target) => this.observer.observe(target));
  }

  initRender() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    if (Object.keys(savedVideos).length > 0) {
      const fragment = document.createDocumentFragment();
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
      const snackBar = createElement({ tag: 'div' });
      snackBar.id = 'snackbar';

      this.$target.appendChild(fragment);
      this.$target.appendChild(snackBar);
    } else {
      // TODO: 비디오가 저장되면 메시지 지우기, 비디오가 삭제되고 저장된 비디오가 없으면 메시지 띄우기
      const notSavedVideoMessage = createElement({
        tag: 'h2',
        textContent: '저장된 비디오가 없습니다.',
      });
      this.$target.appendChild(notSavedVideoMessage);
    }
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
    }
    this.filter = filter ?? 'watchLater';
  }

  render(preStates, states) {
    if (preStates.savedVideoCount !== states.savedVideoCount) {
      console.log('비디오가 저장됨');
      const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
      const lastestVideoId = Object.keys(savedVideos)[
        Object.keys(savedVideos).length - 1
      ];

      const newVideo = new Video({
        videoId: lastestVideoId,
        ...savedVideos[lastestVideoId],
      }).createTemplate('management');
      this.$target.appendChild(newVideo);

      this.observer.observe(newVideo);
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

    clip.remove();
  }

  showSnackBar(text) {
    this.$snackbar.textContent = text;
    this.$snackbar.classList.toggle('show');
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
      this.$snackbar.textContent = '';
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
