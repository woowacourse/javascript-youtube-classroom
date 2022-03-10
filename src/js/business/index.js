import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, setState } from '../modules/stateStore';
import { youtubeAPIFetcher } from '../modules/fetcher';
import { isEmptyKeyword } from '../utils/validation';
import { findVideoInVideoList, parserVideos } from '../utils/util';
import Video from '../modules/video';
import { API_PATHS } from '../constants/fetcher';
import webStore from '../modules/webStore';
import { bind } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
class AppBusiness {
  constructor() {
    bind(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON, this.onClickSearchModalButton);
    bind(CUSTOM_EVENT_KEY.CLICK_OUTSIDE_MODAL, this.onClickOutsideModal);
    bind(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEWORD, this.onSubmitSearchKeyword);
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
    if (isEmptyKeyword(keyword)) {
      alert('키워드를 입력해주세요');
      return;
    }
    try {
      // 스켈레톤 ui 보여주는 상태로
      const searchResult = await youtubeAPIFetcher({
        path: API_PATHS.SEARCH,
        params: { q: keyword, part: 'snippet', maxResults: 10, type: 'video' },
      });

      // 스켈레톤 ui 안보여주는 상태로
      const { items: videoInfos, nextPageToken } = parserVideos(searchResult);
      const videoList = videoInfos.map((videoInfo) => Video.create(videoInfo));

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
    // 가시성 로직을 추가
    const { keyword, nextPageToken: currentPageToken } = getState(STATE_STORE_KEY.SEARCH_RESULT);

    try {
      const searchResult = await youtubeAPIFetcher({
        path: API_PATHS.SEARCH,
        params: {
          q: keyword,
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          pageToken: currentPageToken,
        },
      });
      const { items: videoInfos, nextPageToken } = parserVideos(searchResult);
      const videoList = videoInfos.map((videoInfo) => Video.create(videoInfo));

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
    const { videoList } = getState(STATE_STORE_KEY.SEARCH_RESULT);

    const saveVideo = findVideoInVideoList(videoList, saveVideoId);

    try {
      webStore.setSavedVideoList(saveVideo.getVideoInfo());
    } catch ({ message }) {
      alert(message);
    }
  };
}

export default AppBusiness;
