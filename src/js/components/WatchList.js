import { $, renderSkeletonUI, clearElement, showSnackbar, showElement } from '../utils.js';
import { SELECTORS, LOCAL_STORAGE_KEYS } from '../constants.js';
import { searchYoutubeById } from '../api.js';
import { getVideoTemplate } from '../templates.js';
import Observer from '../lib/Observer.js';

export default class WatchList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.selector = SELECTORS.CLASS.WATCH_LIST;
    this.list = this.store.get().watchList;
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
      showElement(SELECTORS.CLASS.NO_VIDEO);
      return;
    }

    const newVideoId = watchList.filter((id) => !this.list.includes(id));
    if (!newVideoId || newVideoId.length <= 0) return;

    try {
      const { items } = await searchYoutubeById([newVideoId]);

      this.renderSavedVideos(items);
      this.list = watchList;
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}
