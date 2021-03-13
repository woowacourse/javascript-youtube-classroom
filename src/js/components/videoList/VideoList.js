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
  CLASS_NAMES,
} from '../../constants/constants.js';
import { store } from '../../index.js';
import { decreaseSavedVideoCount } from '../../redux/action.js';
import {
  loadIframe,
  pauseAllIframeVideo,
  showSnackBar,
} from '../../utils/youtubeClassRoomUtils.js';

export default class VideoList extends Component {
  constructor($target, $props) {
    super($target, $props);
    this.showByFilter();
  }

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

  displayVideosByTime(savedVideos = {}) {
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
      this.$target.appendChild(fragment);
    }
  }

  initRender() {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    this.displayVideosByTime(savedVideos);
    this.setLazyloading();
  }

  selectDOM() {
    this.$snackbar = $(SELECTORS.VIDEO_LIST.SNACKBAR);
    this.$notFoundImage = $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS);
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
    this.filter = newFilter;
    this.showByFilter();
  }

  showByFilter() {
    const filteredKeys = [];
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
    $$(SELECTORS.VIDEO_LIST.CLIP_CLASS, this.$target).forEach(($elem) => {
      const {
        dataset: { videoId },
      } = $elem;

      if (
        (this.filter === TYPES.FILTER.WATCH_LATER &&
          !savedVideos[videoId].watched) ||
        (this.filter === TYPES.FILTER.WATCHED &&
          savedVideos[videoId].watched) ||
        (this.filter === TYPES.FILTER.LIKED && savedVideos[videoId].liked)
      ) {
        filteredKeys.push(videoId);
        $elem.classList.remove('d-none');
      } else {
        $elem.classList.add('d-none');
      }
    });

    if (filteredKeys.length === 0) {
      this.$notFoundImage.classList.remove('d-none');
      $(SELECTORS.MENU_BUTTON.SEARCH_ID).classList.add(
        CLASS_NAMES.CLIP.SEARCH_BUTTON_GUIDE
      );
    } else {
      this.$notFoundImage.classList.add('d-none');
      $(SELECTORS.MENU_BUTTON.SEARCH_ID).classList.remove(
        CLASS_NAMES.CLIP.SEARCH_BUTTON_GUIDE
      );
    }
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

      this.$target.prepend(newVideo);

      this.iframeLoadObserver.observe(newVideo);

      this.showByFilter();
    }
  }

  onClickWatchedButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    const newSavedVideos = {};
    Object.assign(newSavedVideos, savedVideos);

    newSavedVideos[clip.dataset.videoId].watched = !newSavedVideos[
      clip.dataset.videoId
    ].watched;

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newSavedVideos);
    clip.classList.toggle('d-none');
    $(SELECTORS.CLIP.WATCHED_BUTTON, clip).classList.toggle('checked');
    this.showByFilter();
  }

  onClickLikeButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    const newSavedVideos = {};
    Object.assign(newSavedVideos, savedVideos);

    newSavedVideos[clip.dataset.videoId].liked = !newSavedVideos[
      clip.dataset.videoId
    ].liked;

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newSavedVideos);
    $(SELECTORS.CLIP.LIKE_BUTTON, clip).classList.toggle('checked');
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

    const newSavedVideos = {};
    Object.assign(newSavedVideos, savedVideos);

    delete newSavedVideos[clip.dataset.videoId];
    delete Video.cache[clip.dataset.videoId];
    clip.remove();

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newSavedVideos);
    store.dispatch(decreaseSavedVideoCount());
    this.showByFilter();
  }

  onClickManagementButton(event) {
    if (event.target.localName !== 'button') {
      return;
    }

    let message = '';

    try {
      if (event.target.classList.contains(CLASS_NAMES.CLIP.WATCHED_BUTTON)) {
        this.onClickWatchedButton(event);
        message = MESSAGES.ACTION_SUCCESS.STATE_SETTING;
      } else if (
        event.target.classList.contains(CLASS_NAMES.CLIP.LIKE_BUTTON)
      ) {
        this.onClickLikeButton(event);
        message = MESSAGES.ACTION_SUCCESS.STATE_SETTING;
      } else if (
        event.target.classList.contains(CLASS_NAMES.CLIP.DELETE_BUTTON)
      ) {
        this.onClickDeleteButton(event);
        message = MESSAGES.ACTION_SUCCESS.DELETE;
      }
    } catch (error) {
      message = error.message;
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
