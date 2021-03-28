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
} from '../../constants/constants.js';
import { store } from '../../index.js';
import { decreaseSavedVideoCount } from '../../redux/action.js';
import {
  loadIframe,
  showSnackBar,
  pauseAllIframeVideo,
} from '../../utils/youtubeClassRoomUtils.js';

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

    const videoIdSortedByDate = Object.keys(savedVideos).sort((a, b) => {
      return (
        new Date(savedVideos[b].savedTime) - new Date(savedVideos[a].savedTime)
      );
    });

    if (videoIdSortedByDate.length > 0) {
      fragment.append(
        ...videoIdSortedByDate.map((videoId) =>
          new Video({
            videoId,
            ...savedVideos[videoId],
          }).createTemplate(TYPES.PAGE.MANAGEMENT)
        )
      );
    }

    this.$target.appendChild(fragment);

    this.showByFilter();
    this.setLazyloading();
  }

  selectDOM() {
    this.$snackbar = $(SELECTORS.VIDEO_LIST.SNACKBAR);
  }

  toggleVideoList() {
    $$(SELECTORS.VIDEO_LIST.CLIP_CLASS, this.$target).forEach(($clip) => {
      $clip.classList.toggle('d-none');
    });
  }

  setFilter(newFilter = TYPES.FILTER.WATCH_LATER) {
    if (this.filter === newFilter) {
      return;
    }

    pauseAllIframeVideo();
    this.toggleVideoList();
    this.filter = newFilter;
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
    // video가 삭제된 경우
    if (preStates.savedVideoCount > states.savedVideoCount) {
      this.showByFilter();
    }

    // video가 추가된 경우
    if (preStates.savedVideoCount < states.savedVideoCount) {
      const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
      const videoIdSortedByDate = Object.keys(savedVideos).sort((a, b) => {
        return (
          new Date(savedVideos[b].savedTime) -
          new Date(savedVideos[a].savedTime)
        );
      });
      const latestVideoId = videoIdSortedByDate[0];

      const newVideo = new Video({
        videoId: latestVideoId,
        ...savedVideos[latestVideoId],
      }).createTemplate(TYPES.PAGE.MANAGEMENT);

      if (this.filter === TYPES.FILTER.WATCHED) {
        newVideo.classList.add('d-none');
      }

      this.$target.prepend(newVideo);

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

  onClickManagementButton(event) {
    const eventName = event.target.dataset.eventName;
    if (!eventName) {
      return;
    }

    let message = '';

    // TODO:
    // event Name이 Manager Button에만 있는 경우.
    // 다른 곳에 eventName이 있는 경우 showSnacbard의 위치를 바꾸어야 함.
    switch (eventName) {
      case 'watched':
        this.onClickWatchedButton(event);
        message = MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING;
        break;
      case 'like':
        message = ERROR_MESSAGES.NOT_AVAILABLE_BUTTON;
        break;
      case 'comment':
        message = ERROR_MESSAGES.NOT_AVAILABLE_BUTTON;
        break;
      case 'delete':
        try {
          this.onClickDeleteButton(event);
          message = MESSAGES.ACTION_SUCCESS.DELETE;
        } catch (error) {
          message = error.message;
        }
        break;
      default:
        break;
    }

    showSnackBar(this.$snackbar, message);
  }

  bindEvent() {
    this.$target.addEventListener(
      'click',
      this.onClickManagementButton.bind(this)
    );
  }
}
