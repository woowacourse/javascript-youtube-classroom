import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, setState } from '../modules/stateStore';
import { youtubeAPIFetcher } from '../modules/fetcher';
import { isMoreThanMaxVideoCount, isNoneSearchResult } from '../utils/validation';
import { parserVideos } from '../utils/util';
import Video from '../modules/video';
import { API_PATHS } from '../constants/fetcher';
import webStore from '../modules/webStore';
import { bind } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { WEB_STORE_KEY } from '../constants/webStore';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { getCacheData, setCacheData } from '../modules/cacheStore';
class AppBusiness {
  constructor() {
    bind(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON, this.onClickSearchModalButton);
    bind(CUSTOM_EVENT_KEY.CLICK_OUTSIDE_MODAL, this.onClickOutsideModal);
    bind(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEYWORD, this.onSubmitSearchKeyword);
    bind(CUSTOM_EVENT_KEY.LOAD_NEW_VIDEO_LIST, this.onLoadNewVideoList);
    bind(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, this.onClickSaveButton);
    bind(CUSTOM_EVENT_KEY.CLICK_SAVED_DELETE_BUTTON, this.onClickSavedDeleteButton);
    bind(CUSTOM_EVENT_KEY.CLICK_SAVED_CHECK_BUTTON, this.onClickSavedCheckButton);
    bind(CUSTOM_EVENT_KEY.INITIALIZE_SAVED_VIDEO_STATE, this.onLoadTopLevelComponent);
  }

  onClickSearchModalButton = ({ detail: { targetId } }) => {
    if (targetId === 'search-modal-button') {
      setState(STATE_STORE_KEY.IS_MODAL_SHOW, true);
      return;
    }
    if (targetId === 'watch-video-section-button' || targetId === 'watched-video-section-button') {
      setState(STATE_STORE_KEY.CURRENT_APP_SECTION, targetId);
    }
  };

  onClickOutsideModal = () => {
    setState(STATE_STORE_KEY.IS_MODAL_SHOW, false);
  };

  onSubmitSearchKeyword = async ({ detail: { keyword } }) => {
    try {
      const searchResult = await this.requestVideo(keyword);

      if (isNoneSearchResult(searchResult)) {
        setState(STATE_STORE_KEY.SEARCH_RESULT, {
          keyword: null,
          nextPageToken: null,
          videoList: null,
          prevVideoListLength: 0,
        });
        return;
      }

      const { nextPageToken, videoList } = this.extractSearchResult(searchResult);

      setState(STATE_STORE_KEY.SEARCH_RESULT, {
        keyword,
        nextPageToken,
        videoList,
        prevVideoListLength: 0,
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  onLoadNewVideoList = async () => {
    const { keyword, nextPageToken: currentPageToken } = getState(STATE_STORE_KEY.SEARCH_RESULT);
    try {
      const searchResult = await this.requestVideo(keyword, currentPageToken);

      const { nextPageToken, videoList } = this.extractSearchResult(searchResult);

      setState(STATE_STORE_KEY.SEARCH_RESULT, (prevState) => ({
        ...prevState,
        keyword,
        nextPageToken,
        videoList: [...prevState.videoList, ...videoList],
        prevVideoListLength: prevState.videoList.length,
      }));
    } catch ({ message }) {
      alert(message);
    }
  };

  onClickSaveButton = async ({ detail: { saveVideoId } }) => {
    const videoIdList = webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY);

    if (isMoreThanMaxVideoCount(videoIdList)) {
      alert(ERROR_MESSAGE.SAVE_VIDEO_COUNT_OVER);
      return;
    }

    try {
      const savedVideo = await this.requestVideoById(saveVideoId);
      /** webStore, stateStore에 정보를 set해준다. */
      webStore.setDataInArray(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, saveVideoId);
      setState(STATE_STORE_KEY.SAVED_VIDEO, (prevState) => ({
        ...prevState,
        videoList: [...prevState.videoList, savedVideo],
        prevVideoListLength: prevState.videoList.length,
      }));
    } catch ({ message }) {
      alert(message);
    }
  };

  onLoadTopLevelComponent = async () => {
    const savedVideoIdList = webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY) ?? [];
    try {
      const savedVideoList = await Promise.all(
        savedVideoIdList.map((savedVideoId) => this.requestVideoById(savedVideoId))
      );
      setState(STATE_STORE_KEY.SAVED_VIDEO, (prevState) => ({
        ...prevState,
        videoList: savedVideoList,
        prevVideoListLength: 0,
      }));
    } catch ({ message }) {
      alert(message);
    }
  };

  onClickSavedDeleteButton({ detail: { savedVideoId } }) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const { videoList: savedVideoList } = getState(STATE_STORE_KEY.SAVED_VIDEO);

      const newSavedVideoList = savedVideoList.filter((video) => {
        const { videoId } = video.getVideoInfo();

        return videoId !== savedVideoId;
      });

      setState(STATE_STORE_KEY.SAVED_VIDEO, (prevState) => ({
        ...prevState,
        videoList: newSavedVideoList,
        prevVideoListLength: 0,
      }));

      const savedVideoIdList = webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY);

      const newSavedVideoIdList = savedVideoIdList.filter((videoId) => videoId !== savedVideoId);

      webStore.setData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, newSavedVideoIdList);
    }
  }

  onClickSavedCheckButton({ detail: { savedVideoId, element } }) {
    const { className } = element;
    if (className.includes('checked')) {
      webStore.setData(WEB_STORE_KEY.WATCHED_VIDEO_LIST_KEY, (prev) =>
        prev.filter((videoId) => savedVideoId !== videoId)
      );
      setState(
        STATE_STORE_KEY.WATCHED_VIDEO,
        webStore.getArrayData(WEB_STORE_KEY.WATCHED_VIDEO_LIST_KEY)
      );
      return;
    }
    webStore.setData(WEB_STORE_KEY.WATCHED_VIDEO_LIST_KEY, (prev) => [...prev, savedVideoId]);
    setState(
      STATE_STORE_KEY.WATCHED_VIDEO,
      webStore.getArrayData(WEB_STORE_KEY.WATCHED_VIDEO_LIST_KEY)
    );
  }

  async requestVideo(keyword, pageToken) {
    setState(STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING, true);

    const alreadyData = getCacheData(`${keyword}-${pageToken}`);

    if (alreadyData) {
      setState(STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING, false);
      return alreadyData;
    }

    const searchResult = await youtubeAPIFetcher({
      path: API_PATHS.SEARCH,
      params: {
        q: keyword,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        pageToken: pageToken ?? '',
      },
    });

    setCacheData(`${keyword}-${pageToken}`, searchResult);

    setState(STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING, false);

    return searchResult;
  }
  /** 한 가지일만 하도록 구현한다. */

  async requestVideoById(id) {
    setState(STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING, true);

    const videoResult = await youtubeAPIFetcher({
      path: API_PATHS.GET_VIDEO,
      params: {
        id,
        part: 'snippet',
      },
    });

    setState(STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING, false);

    const {
      items: [videoInfos],
    } = parserVideos(videoResult);

    return Video.create({ ...videoInfos, videoId: id });
  }

  /** 검색 API 결과로 부터, videoList - nextPageToken 값을 추출한다. */

  extractSearchResult(searchResult) {
    const { items: videoInfos, nextPageToken } = parserVideos(searchResult);
    const videoList = videoInfos.map((videoInfo) => Video.create(videoInfo));

    return { nextPageToken, videoList };
  }
}

export default AppBusiness;
