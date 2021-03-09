import Component from '../../core/Component.js';
import Video from '../../model/Video.js';
import {
  $,
  $$,
  localStorageGetItem,
  localStorageSetItem,
  createElement,
} from '../../utils/utils.js';
import {
  LOCALSTORAGE_KEYS,
  TYPES,
  SELECTORS,
  INTERSECTION_OBSERVER_OPTIONS,
  ERROR_MESSAGES,
  MESSAGES,
  CLASS_NAMES,
} from '../../constants/constants.js';
import { store } from '../../index.js';
import { decreaseSavedVideoCount } from '../../redux/action.js';
import { loadIframe } from '../../utils/youtubeClassRoomUtils.js';

export default class VideoList extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
    this.filter = TYPES.FILTER.WATCH_LATER;

    const options = {
      threshold: INTERSECTION_OBSERVER_OPTIONS.IFRAME_LOAD_THRESHOLD,
    };
    this.iframeLoadObserver = new IntersectionObserver(
      loadIframe.bind(this),
      options
    );
  }

  setLazyloading() {
    const clips = $$(SELECTORS.VIDEO_LIST.CLIP_CLASS, this.$target);
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
          }).createTemplate(TYPES.PAGE.MANAGEMENT)
        );
      });
    }

    const snackBar = createElement({ tag: 'div' });
    snackBar.id = 'snackbar';

    const notSavedVideoMessage = createElement({
      tag: 'h2',
      classes: ['not-saved-video-message'],
      textContent: ERROR_MESSAGES.NO_VIDEO_ERROR,
    });

    fragment.appendChild(snackBar);
    fragment.appendChild(notSavedVideoMessage);
    this.$target.appendChild(fragment);

    this.showByFilter();
    this.setLazyloading();
  }

  selectDOM() {
    this.$snackbar = $(SELECTORS.VIDEO_LIST.SNACKBAR);
  }

  setFilter(filter = TYPES.FILTER.WATCH_LATER) {
    if (this.filter === filter) return;
    // TODO: 다른 메서드로 빼기
    $$(SELECTORS.VIDEO_LIST.CLIP_CLASS, this.$target).forEach(($clip) => {
      $clip.classList.toggle('d-none');
    });

    this.filter = filter;
    this.showByFilter();
  }

  showByFilter() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    const isWatched = this.filter === TYPES.FILTER.WATCHED;
    const watchedVideos = Object.keys(savedVideos).filter(
      (videoId) => savedVideos[videoId].watched === isWatched
    );
    watchedVideos.length === 0
      ? $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.remove(
          'd-none'
        )
      : $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.add('d-none');
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
      }).createTemplate(TYPES.PAGE.MANAGEMENT);

      if (this.filter === TYPES.FILTER.WATCHED) {
        newVideo.classList.add('d-none');
      }

      this.$target.appendChild(newVideo);

      this.iframeLoadObserver.observe(newVideo);

      this.showByFilter();
    }
  }

  onClickWatchedButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    savedVideos[clip.dataset.videoId].watched = !savedVideos[
      clip.dataset.videoId
    ].watched;
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    clip.classList.toggle('d-none');
    $(SELECTORS.CLIP.WATCHED_BUTTON, clip).classList.toggle('checked');
    this.showByFilter();
  }

  onClickDeleteButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    if (
      !(confirm(MESSAGES.CONFIRM.DELETE) && savedVideos[clip.dataset.videoId])
    ) {
      throw new Error(ERROR_MESSAGES.VIDEO_DELETE_ERROR);
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
  // ex
  // const ManageButtonClick = {
  //   WATCHED_BUTTON: () => {}
  // }

  // ManageButtonClick(BUTTON_NAME);

  bindEvent() {
    this.$target.addEventListener('click', (event) => {
      try {
        if (event.target.classList.contains(CLASS_NAMES.CLIP.WATCHED_BUTTON)) {
          this.onClickWatchedButton(event);
          this.showSnackBar(MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING);
        } else if (
          event.target.classList.contains(CLASS_NAMES.CLIP.DELETE_BUTTON)
        ) {
          this.onClickDeleteButton(event);
          this.showSnackBar(MESSAGES.ACTION_SUCCESS.DELETE);
        }
      } catch (error) {
        this.showSnackBar(error.message);
      }
    });
  }
}
