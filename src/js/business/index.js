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

  onClickSaveButton = ({ detail: { saveVideoId } }) => {
    const videoList = webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY);

    if (isMoreThanMaxVideoCount(videoList)) {
      alert(ERROR_MESSAGE.SAVE_VIDEO_COUNT_OVER);
      return;
    }

    webStore.setDataInArray(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, saveVideoId);

    setState(
      STATE_STORE_KEY.SAVED_VIDEO,
      webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY)
    );
  };

  async requestVideo(keyword, pageToken) {
    setState(STATE_STORE_KEY.IS_WAITING_RESPONSE, true);

    const alreadyData = getCacheData(`${keyword}-${pageToken}`);

    if (alreadyData) {
      setState(STATE_STORE_KEY.IS_WAITING_RESPONSE, false);
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

    setState(STATE_STORE_KEY.IS_WAITING_RESPONSE, false);

    return searchResult;
  }

  /** 검색 API 결과로 부터, videoList - nextPageToken 값을 추출한다. */

  extractSearchResult(searchResult) {
    const { items: videoInfos, nextPageToken } = parserVideos(searchResult);
    const videoList = videoInfos.map((videoInfo) => Video.create(videoInfo));

    return { nextPageToken, videoList };
  }
}

export default AppBusiness;
