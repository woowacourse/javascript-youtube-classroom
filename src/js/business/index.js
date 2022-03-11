import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, setState } from '../modules/stateStore';
import { youtubeAPIFetcher } from '../modules/fetcher';
import { isNoneSearchResult } from '../utils/validation';
import { parserVideos } from '../utils/util';
import Video from '../modules/video';
import { API_PATHS } from '../constants/fetcher';
import webStore from '../modules/webStore';
import { bind } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { WEB_STORE_KEY } from '../constants/webStore';
class AppBusiness {
  constructor() {
    bind(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON, this.onClickSearchModalButton);
    bind(CUSTOM_EVENT_KEY.CLICK_OUTSIDE_MODAL, this.onClickOutsideModal);
    bind(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEYWORD, this.onSubmitSearchKeyword);
    bind(CUSTOM_EVENT_KEY.SCROLL_VIDEO_CONTAINER, this.onSatisfyLastVideo);
    bind(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, this.onClickSaveButton);
  }

  onClickSearchModalButton = () => {
    setState(STATE_STORE_KEY.IS_MODAL_SHOW, true);
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

  onSatisfyLastVideo = async () => {
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
    try {
      webStore.setSavedVideoList(saveVideoId);
      setState(STATE_STORE_KEY.SAVED_VIDEO, webStore.getData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY));
    } catch ({ message }) {
      alert(message);
    }
  };

  async requestVideo(keyword, pageToken) {
    setState(STATE_STORE_KEY.IS_WAITING_RESPONSE, true);

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
