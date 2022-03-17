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
      const { videoList: savedVideoList, prevVideoListLength } = getState(
        STATE_STORE_KEY.SAVED_VIDEO
      );

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
    // setState(STATE_STORE_KEY.SAVED_VIDEO);
  }

  onClickSavedCheckButton() {}

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

  async requestVideoById(id) {
    const videoResult = this.#savedVideoMockData;

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

  #savedVideoMockData = {
    kind: 'youtube#videoListResponse',
    etag: 'CHfy7iZJw_MUUhz_O8MZhpndvIQ',
    items: [
      {
        kind: 'youtube#video',
        etag: 'OrqPPvgI6IYaxTmm_DhiezMQaPI',
        id: '2oaGrBW5jxo',
        snippet: {
          publishedAt: '2019-02-04T13:36:09Z',
          channelId: 'UCjLDL_hX8XrwSRMUba-39Fw',
          title: '[ENG Sub] 보더콜리 하이는 누구인가? 슬로우모션 손 하는 강아지',
          description:
            '해보고 싶었던 아이들 하나하나 속성으로 파헤치는!\n총 정리 영상입니다! 첫 타자로는 막내 하이부터 시작할게요!\n우리의 막내 완쟈님 하이에 대해 속성으로 알아봅시다! :-)\n\n재밌게 예쁘게 봐주셔서 미리 감사드립니다!\n구독도 알람도 많이 부탁드릴게요 :-)\n\n* 예의없는 댓글과 악플은 차단/삭제 합니다 !\n-\n페퍼네 인스타그램\nhttps://www.instagram.com/peppoya\n\nbgm\n#14 Vendredi - Show me the way\nhttps://youtu.be/1swecA5cnnQ',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/2oaGrBW5jxo/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/2oaGrBW5jxo/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/2oaGrBW5jxo/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/2oaGrBW5jxo/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/2oaGrBW5jxo/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: '보더로운생활',
          tags: ['보더콜리', 'bordercollie', '하이를속성으로', '알아봅시다'],
          categoryId: '15',
          liveBroadcastContent: 'none',
          defaultLanguage: 'ko',
          localized: {
            title: '[ENG Sub] 보더콜리 하이는 누구인가? 슬로우모션 손 하는 강아지',
            description:
              '해보고 싶었던 아이들 하나하나 속성으로 파헤치는!\n총 정리 영상입니다! 첫 타자로는 막내 하이부터 시작할게요!\n우리의 막내 완쟈님 하이에 대해 속성으로 알아봅시다! :-)\n\n재밌게 예쁘게 봐주셔서 미리 감사드립니다!\n구독도 알람도 많이 부탁드릴게요 :-)\n\n* 예의없는 댓글과 악플은 차단/삭제 합니다 !\n-\n페퍼네 인스타그램\nhttps://www.instagram.com/peppoya\n\nbgm\n#14 Vendredi - Show me the way\nhttps://youtu.be/1swecA5cnnQ',
          },
          defaultAudioLanguage: 'ko',
        },
      },
    ],
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
  };
}

export default AppBusiness;
