import { $, renderSkeletonUI, clearElement, showSnackbar, showElement, hideElement } from '../utils.js';
import { SELECTORS, LOCAL_STORAGE_KEYS, ALERT_MESSAGE } from '../constants.js';
import { searchYoutubeById } from '../api.js';
import { getVideoTemplate } from '../templates.js';
import Observer from '../lib/Observer.js';

export default class WatchList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.selector = SELECTORS.CLASS.WATCH_LIST;
    this.list = [];

    this.bindEvents();
  }

  renderSavedVideos(items) {
    const resultTemplate = items
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt } = item.snippet;
        const { id } = item;

        const dateString = new Date(publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const video = { id, title, channelId, channelTitle, dateString };
        const options = { containsMenu: true };
        const videoTemplate = getVideoTemplate(video, options);

        return videoTemplate;
      })
      .join('');

    $(SELECTORS.CLASS.WATCH_LIST).insertAdjacentHTML('beforeend', resultTemplate);
  }

  async render() {
    const watchList = this.store.load(LOCAL_STORAGE_KEYS.WATCH_LIST);
    const watchListIds = watchList.map((item) => item.videoId);

    if (!watchList || watchList.length <= 0) {
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    renderSkeletonUI(SELECTORS.CLASS.WATCH_LIST, watchList.filter(({ watched }) => !watched).length);

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
    const { watchList } = this.store.get();
    const watchListIds = watchList.map((item) => item.videoId);
    if (!watchList || watchList.length <= 0) {
      clearElement(SELECTORS.CLASS.WATCH_LIST);
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    hideElement(SELECTORS.CLASS.NO_VIDEO);

    const oldVideo = this.list.find(({ id }) => !watchListIds.includes(id));
    if (oldVideo) {
      const $targetVideo = $(`${SELECTORS.CLASS.CLIP}[data-video-id="${oldVideo.id}"]`);
      $targetVideo.remove(); // NOTE: 데이터만 변경해도 삭제할 수 있는 방법 좀 더 생각해 볼 필요 있음
      this.list = this.list.filter(({ id }) => watchListIds.includes(id));

      return;
    }

    const idsList = this.list.map(({ id }) => id);
    const newVideo = watchList.find(({ videoId }) => !idsList.includes(videoId));
    console.log('newVideo', newVideo);

    if (!newVideo) return;

    try {
      const { items } = await searchYoutubeById([newVideo.videoId]);
      this.renderSavedVideos(items);

      this.list = [...this.list, { ...items[0], watched: newVideo.watched }];
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  bindEvents() {
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', (event) => {
      const { target } = event;
      const { watchList } = this.store.get();
      if (target.classList.contains('delete')) {
        if (!window.confirm(ALERT_MESSAGE.CONFIRM_DELETE)) return;

        const targetId = target.closest('.menu-list').dataset.videoId;
        const newWatchList = watchList.filter(({ videoId }) => videoId !== targetId);
        this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList, this);
      }
    });

    $(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).addEventListener('click', () => {
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      const watchedList = this.list.filter(({ watched }) => !watched);
      this.renderSavedVideos(watchedList);
    });

    $(SELECTORS.CLASS.WATCHED_LIST_BUTTON).addEventListener('click', () => {
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      const watchedList = this.list.filter(({ watched }) => watched);
      this.renderSavedVideos(watchedList);
    });
  }
}
