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
    this.list = this.store.get().watchList;

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
    if (!watchList || watchList.length <= 0) {
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    renderSkeletonUI(SELECTORS.CLASS.WATCH_LIST, watchList.length);

    try {
      const { items } = await searchYoutubeById(watchList);
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      this.renderSavedVideos(items);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  async update() {
    const { watchList } = this.store.get();
    if (!watchList || watchList.length <= 0) {
      clearElement(SELECTORS.CLASS.WATCH_LIST);
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    hideElement(SELECTORS.CLASS.NO_VIDEO);

    const oldVideoId = this.list.filter((id) => !watchList.includes(id));
    if (oldVideoId.length > 0) {
      oldVideoId.forEach((id) => {
        const $targetVideo = $(`${SELECTORS.CLASS.CLIP}[data-video-id="${id}"]`);
        $targetVideo.remove(); // NOTE: 데이터만 변경해도 삭제할 수 있는 방법 좀 더 생각해 볼 필요 있음
      });

      this.list = watchList;
      return;
    }

    const newVideoId = watchList.filter((id) => !this.list.includes(id));
    if (!newVideoId || newVideoId.length <= 0) {
      return;
    }

    try {
      const { items } = await searchYoutubeById([newVideoId]);

      this.renderSavedVideos(items);
      this.list = watchList;
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  bindEvents() {
    $(SELECTORS.CLASS.WATCH_LIST).addEventListener('click', (event) => {
      console.log(ALERT_MESSAGE.CONFIRM_DELETE);
      if (!window.confirm(ALERT_MESSAGE.CONFIRM_DELETE)) return;

      const { target } = event;
      const { watchList } = this.store.get();
      if (target.classList.contains('delete')) {
        const targetId = target.closest('.menu-list').dataset.videoId;
        const newWatchList = watchList.filter((id) => id !== targetId);
        this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList, this);
      }
    });
  }
}
