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
        $elem.classList.remove('d-none');
      } else {
        $elem.classList.add('d-none');
      }
    });

    const filteredKeys = Object.keys(savedVideos).filter((videoId) => {
      switch (this.filter) {
        case TYPES.FILTER.WATCH_LATER:
          return savedVideos[videoId].watched === false;
        case TYPES.FILTER.WATCHED:
          return savedVideos[videoId].watched === true;
        case TYPES.FILTER.LIKED:
          return savedVideos[videoId].liked === true;
        default:
          return false;
      }
    });

    if (filteredKeys.length === 0) {
      this.$notFoundImage.classList.remove('d-none');
      $(SELECTORS.MENU_BUTTON.SEARCH_ID).classList.add('search-button-guide');
    } else {
      this.$notFoundImage.classList.add('d-none');
      $(SELECTORS.MENU_BUTTON.SEARCH_ID).classList.remove(
        'search-button-guide'
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

    const newObject = {};
    Object.assign(newObject, savedVideos);

    newObject[clip.dataset.videoId].watched = !newObject[clip.dataset.videoId]
      .watched;

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newObject);
    clip.classList.toggle('d-none');
    $(SELECTORS.CLIP.WATCHED_BUTTON, clip).classList.toggle('checked');
    this.showByFilter();
  }

  onClickLikeButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    const newObject = {};
    Object.assign(newObject, savedVideos);

    newObject[clip.dataset.videoId].liked = !newObject[clip.dataset.videoId]
      .liked;

    if (!newObject[clip.dataset.videoId].liked) {
      clip.classList.add('d-none');
    }

    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newObject);
    $(SELECTORS.CLIP.LIKE_BUTTON, clip).classList.toggle('checked');
  }

  onClickDeleteButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    if (
      !(confirm(MESSAGES.CONFIRM.DELETE) && savedVideos[clip.dataset.videoId])
    ) {
      throw new Error(ERROR_MESSAGES.VIDEO_DELETE_ERROR);
    }

    const newObject = {};
    Object.assign(newObject, savedVideos);

    delete newObject[clip.dataset.videoId];
    delete Video.cache[clip.dataset.videoId];
    clip.remove();
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, newObject);
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
