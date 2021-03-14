import {
  $,
  renderSkeletonUI,
  clearElement,
  showSnackbar,
  showElement,
  hideElement,
  colorizeButton,
  uncolorizeButton,
  getVideoSaveButton,
  openModal,
} from '../utils.js';
import { SELECTORS, LOCAL_STORAGE_KEYS, ALERT_MESSAGE, MENU } from '../constants.js';
import { searchYoutubeById } from '../api.js';
import { getVideoTemplate, getVideoPlayerTemplate } from '../templates.js';
import Observer from '../lib/Observer.js';

export default class WatchList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.selector = SELECTORS.CLASS.WATCH_LIST;
    this.list = [];
    this.nowMenu = MENU.TO_WATCH;

    this.bindEvents();
  }

  renderSavedVideos(items) {
    const resultTemplate = items
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt, thumbnails } = item.snippet;
        const thumbnailURL = thumbnails.high.url;
        const { id } = item;

        const dateString = new Date(publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const video = { id, title, channelId, channelTitle, dateString, thumbnailURL };
        const options = { isContainMenu: true, isWatched: this.nowMenu === MENU.WATCHED };
        const videoTemplate = getVideoTemplate(video, options);

        return videoTemplate;
      })
      .join('');

    $(SELECTORS.CLASS.WATCH_LIST).insertAdjacentHTML('beforeend', resultTemplate);
  }

  async render() {
    const watchList = this.store.load(LOCAL_STORAGE_KEYS.WATCH_LIST);
    const watchListIds = watchList.map(({ videoId }) => videoId);
    const toWatchList = watchList.filter(({ watched }) => !watched);

    if (!toWatchList || toWatchList.length <= 0) {
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    renderSkeletonUI(SELECTORS.CLASS.WATCH_LIST, toWatchList.length);

    try {
      const { items } = await searchYoutubeById(watchListIds);

      this.list = watchList.map(({ videoId, watched }) => {
        const video = items.find(({ id }) => id === videoId);
        return { ...video, watched };
      });

      const toWatchVideos = this.list.filter((video) => !video.watched);

      clearElement(SELECTORS.CLASS.WATCH_LIST);
      this.renderSavedVideos(toWatchVideos);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  async update() {
    try {
      const { watchList } = this.store.get();
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      const currentIds = this.list.map((video) => video.id);
      const newVideo = watchList.find((item) => !currentIds.includes(item.videoId));

      if (newVideo) {
        const { items } = await searchYoutubeById([newVideo.videoId]);
        this.list = [...this.list, ...items];
      }

      if (this.nowMenu === MENU.WATCHED) {
        const watchedList = watchList.filter((item) => item.watched);
        const watchedListIds = watchedList.map((item) => item.videoId);

        if (watchedList.length) {
          hideElement(SELECTORS.CLASS.NO_VIDEO);
        } else {
          showElement(SELECTORS.CLASS.NO_VIDEO);
        }

        const renderingVideos = this.list.filter(({ id }) => watchedListIds.includes(id));
        this.renderSavedVideos(renderingVideos);
      } else if (this.nowMenu === MENU.TO_WATCH) {
        const toWatchList = watchList.filter((item) => !item.watched);
        const toWatchListIds = toWatchList.map((item) => item.videoId);

        if (toWatchList.length) {
          hideElement(SELECTORS.CLASS.NO_VIDEO);
        } else {
          showElement(SELECTORS.CLASS.NO_VIDEO);
        }

        const renderingVideos = this.list.filter(({ id }) => toWatchListIds.includes(id));
        this.renderSavedVideos(renderingVideos);
      }
    } catch (error) {
      console.error(error);
      showSnackbar(error.message);
    }
  }

  handleClickVideoMenu(event) {
    const { target } = event;
    const { watchList } = this.store.get();

    if (target.classList.contains('delete')) {
      if (!window.confirm(ALERT_MESSAGE.CONFIRM_DELETE)) return;

      const targetId = target.closest(SELECTORS.CLASS.MENU_LIST).dataset.videoId;
      const newWatchList = watchList.filter(({ videoId }) => videoId !== targetId);
      this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList);

      const $saveButton = getVideoSaveButton(targetId);
      if ($saveButton) {
        $saveButton.classList.remove('hidden');
      }

      showSnackbar(ALERT_MESSAGE.VIDEO_DELETED);
    }

    if (target.classList.contains('watched')) {
      const targetId = target.closest(SELECTORS.CLASS.MENU_LIST).dataset.videoId;
      const newWatchList = watchList.map((video) => {
        const nowVideo = { ...video };
        if (nowVideo.videoId === targetId) {
          nowVideo.watched = !nowVideo.watched;
        }
        return nowVideo;
      });

      this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList);

      if (this.nowMenu === MENU.TO_WATCH) {
        showSnackbar(ALERT_MESSAGE.VIDEO_MOVED_WATCHED_LIST);
      } else if (this.nowMenu === MENU.WATCHED) {
        showSnackbar(ALERT_MESSAGE.VIDEO_MOVED_TO_WATCH_LIST);
      }
    }
  }

  handlePlayVideo(event) {
    const { target } = event;

    if (target.classList.contains('play-button')) {
      const targetId = target.closest(SELECTORS.CLASS.CLIP).dataset.videoId;
      $(SELECTORS.CLASS.VIDEO_MODAL).innerHTML = getVideoPlayerTemplate(targetId);
      openModal(SELECTORS.CLASS.VIDEO_MODAL);
    }
  }

  handleShowToWatchList() {
    this.nowMenu = MENU.TO_WATCH;
    colorizeButton(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON);
    uncolorizeButton(SELECTORS.CLASS.WATCHED_LIST_BUTTON);
    clearElement(SELECTORS.CLASS.WATCH_LIST);

    const { watchList } = this.store.get();
    const toWatchList = watchList.filter(({ watched }) => !watched);
    const toWatchListIds = toWatchList.map((item) => item.videoId);

    if (toWatchList.length) {
      hideElement(SELECTORS.CLASS.NO_VIDEO);
    } else {
      showElement(SELECTORS.CLASS.NO_VIDEO);
    }

    const renderingVideos = this.list.filter(({ id }) => toWatchListIds.includes(id));
    this.renderSavedVideos(renderingVideos);
  }

  handleShowWatchedList() {
    this.nowMenu = MENU.WATCHED;
    colorizeButton(SELECTORS.CLASS.WATCHED_LIST_BUTTON);
    uncolorizeButton(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON);
    clearElement(SELECTORS.CLASS.WATCH_LIST);

    const { watchList } = this.store.get();
    const watchedList = watchList.filter(({ watched }) => watched);
    const watchedListIds = watchedList.map((item) => item.videoId);

    if (watchedList.length) {
      hideElement(SELECTORS.CLASS.NO_VIDEO);
    } else {
      showElement(SELECTORS.CLASS.NO_VIDEO);
    }

    const renderingVideos = this.list.filter(({ id }) => watchedListIds.includes(id));
    this.renderSavedVideos(renderingVideos);
  }

  bindEvents() {
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', this.handleClickVideoMenu.bind(this));
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', this.handlePlayVideo.bind(this));
    $(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).addEventListener('click', this.handleShowToWatchList.bind(this));
    $(SELECTORS.CLASS.WATCHED_LIST_BUTTON).addEventListener('click', this.handleShowWatchedList.bind(this));
  }
}
