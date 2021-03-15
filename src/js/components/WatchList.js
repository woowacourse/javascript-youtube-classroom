import {
  $,
  $all,
  renderSkeletonUI,
  clearElement,
  showSnackbar,
  showElement,
  hideElement,
  getVideoSaveButton,
  openModal,
  selectButton,
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
    this.setLazyLoadObserver();
  }

  setLazyLoadObserver() {
    const options = {
      root: null,
      threshold: 0.1,
    };

    this.lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
          entry.target.classList.add(SELECTORS.STATUS.IMAGE_LOADED);
          this.lazyLoadObserver.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeLazyLoad(selector) {
    const $$elements = $all(selector);
    $$elements.forEach(($element) => {
      if (!$element.classList.contains(SELECTORS.STATUS.IMAGE_LOADED)) {
        this.lazyLoadObserver.observe($element);
      }
    });
  }

  renderSavedVideos(items) {
    const resultTemplate = items
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt, thumbnails } = item.snippet;
        const thumbnailURL = thumbnails.high.url;
        const { id, watched, liked } = item;

        const dateString = new Date(publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const video = { id, title, channelId, channelTitle, dateString, thumbnailURL };
        const options = { isContainMenu: true, isWatched: watched, isLiked: liked };
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
    }

    if (!watchList || watchList.length <= 0) return;

    renderSkeletonUI(SELECTORS.CLASS.WATCH_LIST, toWatchList.length);

    try {
      const { items } = await searchYoutubeById(watchListIds);

      this.list = watchList.map(({ videoId, watched, liked }) => {
        const video = items.find(({ id }) => id === videoId);
        return { ...video, watched, liked };
      });

      const toWatchVideos = this.list.filter((video) => !video.watched);

      clearElement(SELECTORS.CLASS.WATCH_LIST);
      this.renderSavedVideos(toWatchVideos);
      this.observeLazyLoad(SELECTORS.CLASS.PREVIEW_CONTAINER);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  getVideosByNowMenu() {
    const { watchList } = this.store.get();
    let selectedList = [];

    if (this.nowMenu === MENU.LIKED) {
      selectedList = watchList.filter(({ liked }) => liked);
    } else if (this.nowMenu === MENU.TO_WATCH) {
      selectedList = watchList.filter(({ watched }) => !watched);
    } else if (this.nowMenu === MENU.WATCHED) {
      selectedList = watchList.filter(({ watched }) => watched);
    }

    if (selectedList.length) {
      hideElement(SELECTORS.CLASS.NO_VIDEO);
    } else {
      showElement(SELECTORS.CLASS.NO_VIDEO);
    }

    const selectedListIds = selectedList.map((item) => item.videoId);

    return this.list.filter(({ id }) => selectedListIds.includes(id));
  }

  async updateList() {
    const { watchList } = this.store.get();

    const currentIds = this.list.map((video) => video.id);
    const newVideo = watchList.find((item) => !currentIds.includes(item.videoId));

    try {
      if (newVideo) {
        const { items } = await searchYoutubeById([newVideo.videoId]);
        this.list = [...this.list, ...items];
      }

      this.list = this.list.map((video) => {
        const currentItem = watchList.find((item) => item.videoId === video.id);
        return { ...video, ...currentItem };
      });
    } catch (error) {
      console.error(error);
      showSnackbar(error.message);
    }
  }

  async update() {
    await this.updateList();
    clearElement(SELECTORS.CLASS.WATCH_LIST);

    const selectedMenuVideos = this.getVideosByNowMenu();
    this.renderSavedVideos(selectedMenuVideos);
    this.observeLazyLoad(SELECTORS.CLASS.PREVIEW_CONTAINER);
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

    if (target.classList.contains('like')) {
      let isLiked = false;
      const targetId = target.closest(SELECTORS.CLASS.MENU_LIST).dataset.videoId;
      const newWatchList = watchList.map((video) => {
        const nowVideo = { ...video };
        if (nowVideo.videoId === targetId) {
          isLiked = nowVideo.liked = !nowVideo.liked;
        }
        return nowVideo;
      });

      this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList);

      if (isLiked) {
        showSnackbar(ALERT_MESSAGE.VIDEO_LIKED);
      } else {
        showSnackbar(ALERT_MESSAGE.VIDEO_UNLIKED);
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

  handleSelectMenu(menu) {
    this.nowMenu = menu;

    if (this.nowMenu === MENU.TO_WATCH) {
      selectButton(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON);
    } else if (this.nowMenu === MENU.WATCHED) {
      selectButton(SELECTORS.CLASS.WATCHED_LIST_BUTTON);
    } else if (this.nowMenu === MENU.LIKED) {
      selectButton(SELECTORS.CLASS.LIKED_LIST_BUTTON);
    }

    clearElement(SELECTORS.CLASS.WATCH_LIST);

    const selectedMenuVideos = this.getVideosByNowMenu();
    this.renderSavedVideos(selectedMenuVideos);
    this.observeLazyLoad(SELECTORS.CLASS.PREVIEW_CONTAINER);
  }

  bindEvents() {
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', this.handleClickVideoMenu.bind(this));
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', this.handlePlayVideo.bind(this));
    $(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).addEventListener('click', this.handleSelectMenu.bind(this, MENU.TO_WATCH));
    $(SELECTORS.CLASS.WATCHED_LIST_BUTTON).addEventListener('click', this.handleSelectMenu.bind(this, MENU.WATCHED));
    $(SELECTORS.CLASS.LIKED_LIST_BUTTON).addEventListener('click', this.handleSelectMenu.bind(this, MENU.LIKED));
  }
}
