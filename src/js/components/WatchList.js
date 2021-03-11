import {
  $,
  renderSkeletonUI,
  clearElement,
  showSnackbar,
  showElement,
  hideElement,
  colorizeButton,
  uncolorizeButton,
} from '../utils.js';
import { SELECTORS, LOCAL_STORAGE_KEYS, ALERT_MESSAGE, MENU } from '../constants.js';
import { searchYoutubeById } from '../api.js';
import { getVideoTemplate } from '../templates.js';
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
        const { channelId, title, channelTitle, publishedAt } = item.snippet;
        const { id } = item;

        const dateString = new Date(publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const video = { id, title, channelId, channelTitle, dateString };
        const options = { containsMenu: true, isWatched: this.nowMenu === MENU.WATCHED };
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

  // update() - 기존에 렌더된 아이템은 두고, 변화될 것만 감지해서 렌더링
  // - 추가되면 추가만
  // - 삭제 되면 삭제한 것만 안 보이게
  //   - 볼 목록 or 본 목록
  // this.store.update -> 자동 렌더 -> 실상은... 일일이 render 함수에 신경을 써줄수밖에 없었음
  // 옵저버 패턴이라는 형태에 맞게 코드를 작성하기 위해서, 한번에 다시 렌더하는 방법을 택함
  // - 처음부터 최적화를 하려고 들어서 코드가 많이 꼬임
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

        const renderingVideos = this.list.filter(({ id }) => watchedListIds.includes(id));
        this.renderSavedVideos(renderingVideos);
      } else if (this.nowMenu === MENU.TO_WATCH) {
        const toWatchList = watchList.filter((item) => !item.watched);
        const toWatchListIds = toWatchList.map((item) => item.videoId);

        const renderingVideos = this.list.filter(({ id }) => toWatchListIds.includes(id));
        this.renderSavedVideos(renderingVideos);
      }
    } catch (error) {
      console.error(error);
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

      if (target.classList.contains('watched')) {
        const targetId = target.closest('.menu-list').dataset.videoId;
        const newWatchList = watchList.map((video) => {
          const nowVideo = { ...video };
          if (nowVideo.videoId === targetId) {
            nowVideo.watched = !nowVideo.watched;
          }
          return nowVideo;
        });
        this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, newWatchList, this);
      }
    });

    $(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON).addEventListener('click', () => {
      this.nowMenu = MENU.TO_WATCH;
      colorizeButton(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON);
      uncolorizeButton(SELECTORS.CLASS.WATCHED_LIST_BUTTON);
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      const { watchList } = this.store.get();
      const toWatchList = watchList.filter(({ watched }) => !watched);
      const toWatchListIds = toWatchList.map((item) => item.videoId);

      const renderingVideos = this.list.filter(({ id }) => toWatchListIds.includes(id));
      this.renderSavedVideos(renderingVideos);
    });

    $(SELECTORS.CLASS.WATCHED_LIST_BUTTON).addEventListener('click', () => {
      this.nowMenu = MENU.WATCHED;
      colorizeButton(SELECTORS.CLASS.WATCHED_LIST_BUTTON);
      uncolorizeButton(SELECTORS.CLASS.TO_WATCH_LIST_BUTTON);
      clearElement(SELECTORS.CLASS.WATCH_LIST);

      const { watchList } = this.store.get();
      const watchedList = watchList.filter(({ watched }) => watched);
      const watchedListIds = watchedList.map((item) => item.videoId);

      const renderingVideos = this.list.filter(({ id }) => watchedListIds.includes(id));
      this.renderSavedVideos(renderingVideos);
    });
  }
}
