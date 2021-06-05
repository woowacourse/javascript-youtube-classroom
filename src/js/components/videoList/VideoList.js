import Component from '../../core/Component.js';
import Video from '../../model/Video.js';
import {
  $,
  $$,
  localStorageGetItem,
  localStorageSetItem,
} from '../../utils/utils.js';
import {
  LOCALSTORAGE_KEYS,
  TYPES,
  SELECTORS,
  INTERSECTION_OBSERVER_OPTIONS,
  ERROR_MESSAGES,
  MESSAGES,
  FILTERS,
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
    this.filter = FILTERS.WATCH_LATER;

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

  setFilter(newFilter = FILTERS.WATCH_LATER) {
    if (this.filter === newFilter) {
      return;
    }

    pauseAllIframeVideo();
    this.filter = newFilter;
    this.showByFilter();
  }

  showByFilter() {
    const targetVideoIdList = Object.entries(
      localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS)
    )
      .filter(([_, value]) => this.filter(value))
      .map(([key]) => key);

    $$('.clip').forEach(($clip) => {
      if (targetVideoIdList.includes($clip.dataset.videoId)) {
        $clip.classList.remove('d-none');
        return;
      }
      $clip.classList.add('d-none');
    });

    if (targetVideoIdList.length) {
      $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.add('d-none');
      return;
    }
    $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.remove('d-none');
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

      if (this.filter === FILTERS.WATCHED) {
        newVideo.classList.add('d-none');
      }

      this.$target.prepend(newVideo);

      this.iframeLoadObserver.observe(newVideo);

      this.showByFilter();
    }
  }

  onClickStatusButton(event, status) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    savedVideos[clip.dataset.videoId][status] =
      !savedVideos[clip.dataset.videoId][status];

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    event.target.classList.toggle('checked');

    this.showByFilter();
  }

  onClickDeleteButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    if (!confirm(MESSAGES.CONFIRM.DELETE)) {
      throw new Error(ERROR_MESSAGES.CANCEL_DELETE);
    }

    if (savedVideos[clip.dataset.videoId]) {
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

    switch (eventName) {
      case 'watched':
        this.onClickStatusButton(event, 'watched');
        message = MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING;
        break;
      case 'like':
        this.onClickStatusButton(event, 'liked');
        message = MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING;
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
