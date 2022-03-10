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
    bind(CUSTOM_EVENT_KEY.SCROLL_VIDEO_CONTAINER, this.onScrollVideoContainer);
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
      const searchResult = await youtubeAPIFetcher({
        path: API_PATHS.SEARCH,
        params: { q: keyword, part: 'snippet', maxResults: 10, type: 'video' },
      });
      const { items: videoInfos, nextPageToken } = parserVideos(searchResult);
      const videoList = videoInfos.map((videoInfo) => Video.create(videoInfo));
      setState(STATE_STORE_KEY.VIDEO_LIST, videoList);
    } catch ({ message }) {
      alert(message);
    }
  };

  onScrollVideoContainer = () => {};

  onClickSaveButton = ({ detail: { saveVideoId } }) => {
    const videoList = getState(STATE_STORE_KEY.VIDEO_LIST);

    const saveVideo = findVideoInVideoList(videoList, saveVideoId);

    try {
      webStore.setSavedVideoList(saveVideo.getVideoInfo());
    } catch ({ message }) {
      alert(message);
    }
  };
}

export default AppBusiness;
