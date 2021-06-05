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
    this.filter = newFilter;
    this.showByFilter();
  }

  showByFilter() {
    let hasLikedVideo = false;
    let hasWatchedVideo = false;
    let hasWatchLaterVideo = false;

    if (this.filter === TYPES.FILTER.LIKED) {
      $$('.clip').forEach(($clip) => {
        if ($clip.querySelector('.like-button').classList.contains('liked')) {
          $clip.classList.remove('d-none');
          hasLikedVideo = true;
        } else {
          $clip.classList.add('d-none');
        }
      });
    }

    if (this.filter === TYPES.FILTER.WATCHED) {
      $$('.clip').forEach(($clip) => {
        if (
          $clip.querySelector('.watched-button').classList.contains('checked')
        ) {
          $clip.classList.remove('d-none');
          hasWatchedVideo = true;
        } else {
          $clip.classList.add('d-none');
        }
      });
    }

    if (this.filter === TYPES.FILTER.WATCH_LATER) {
      $$('.clip').forEach(($clip) => {
        if (
          $clip.querySelector('.watched-button').classList.contains('checked')
        ) {
          $clip.classList.add('d-none');
        } else {
          $clip.classList.remove('d-none');
          hasWatchLaterVideo = true;
        }
      });
    }

    if (
      (this.filter === TYPES.FILTER.WATCHED && !hasWatchedVideo) ||
      (this.filter === TYPES.FILTER.WATCH_LATER && !hasWatchLaterVideo) ||
      (this.filter === TYPES.FILTER.LIKED && !hasLikedVideo)
    ) {
      console.log(
        this.filter,
        hasWatchedVideo,
        hasWatchLaterVideo,
        hasLikedVideo
      );
      console.log('show');
      $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.remove('d-none');
    } else {
      console.log(
        this.filter,
        hasWatchedVideo,
        hasWatchLaterVideo,
        hasLikedVideo
      );
      $(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).classList.add('d-none');
    }
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

  onClickLikedButton(event) {
    const clip = event.target.closest(SELECTORS.VIDEO_LIST.CLIP_CLASS);
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    savedVideos[clip.dataset.videoId].liked = !savedVideos[clip.dataset.videoId]
      .liked;
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);
    $(SELECTORS.CLIP.LIKE_BUTTON, clip).classList.toggle('liked');

    if (
      this.filter === TYPES.FILTER.LIKED &&
      !$(SELECTORS.CLIP.LIKE_BUTTON, clip).classList.contains('liked')
    ) {
      clip.classList.toggle('d-none');
    }
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

    switch (eventName) {
      case 'watched':
        this.onClickWatchedButton(event);
        message = MESSAGES.ACTION_SUCCESS.WATCHED_STATE_SETTING;
        break;
      case 'like':
        this.onClickLikedButton(event);
        return;
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
