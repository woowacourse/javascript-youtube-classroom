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

    const notSavedVideoImage = createElement({
      tag: 'img',
      classes: ['not-saved-video-image'],
    });

    notSavedVideoImage.src =
      './src/images/status/youtube_no_saved_image_light.jpeg';
    notSavedVideoImage.alt = 'no_saved_video';

    fragment.appendChild(notSavedVideoImage);
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
    if (event.target.localName !== 'button') {
      return;
    }

    let message = '';

    try {
      if (event.target.classList.contains(CLASS_NAMES.CLIP.WATCHED_BUTTON)) {
        this.onClickWatchedButton(event);
        message = MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING;
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
