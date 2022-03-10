import { isEmptyKeyword } from '../utils/validation';
import Component from './Component';
import SearchModalComponent from './SearchModalComponent';
import { youtubeAPIFetcher } from '../modules/fetcher';
import webStore from '../modules/webStore';
import { setState, getState } from '../modules/stateStore';
import Video from '../modules/video';
import { findVideoInVideoList, parserVideos } from '../utils/util';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { API_PATHS } from '../constants/fetcher';
class AppComponent extends Component {
  searchModalComponent = null;

  $searchModalButton = null;

  constructor(parentElement, state) {
    super(parentElement, state);
    this.mount();
    this.initDOM();
    this.initChildrenComponent();
    this.bindEventHandler();
  }

  mount() {
    const template = this.generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
  }

  initChildrenComponent() {
    this.searchModalComponent = new SearchModalComponent({
      parentElement: this.parentElement,
      handlers: {
        onClickOutsideModal: this.onClickOutsideModal,
        onSubmitSearchKeyword: this.onSubmitSearchKeyword,
        onClickSaveButton: this.onClickSaveButton,
      },
    });
  }

  bindEventHandler() {
    this.$searchModalButton.addEventListener('click', this.onClickSearchModalButton);
  }

  generateTemplate() {
    return `<main id="app" class="classroom-container">
    <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
    <nav class="nav">
      <button id="search-modal-button" class="button nav__button">🔍 검색</button>
    </nav>
  </main>`;
  }

  onClickSearchModalButton = () => {
    setState(STATE_STORE_KEY.IS_MODAL_SHOW, true);
  };

  onClickOutsideModal = () => {
    setState(STATE_STORE_KEY.IS_MODAL_SHOW, false);
  };

  async onSubmitSearchKeyword(keyword) {
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
  }

  onScrollVideoContainer() {}

  onClickSaveButton(saveVideoId) {
    const videoList = getState(STATE_STORE_KEY.VIDEO_LIST);

    const saveVideo = findVideoInVideoList(videoList, saveVideoId);

    try {
      webStore.setSavedVideoList(saveVideo.getVideoInfo());
    } catch ({ message }) {
      alert(message);
    }
  }
}
export default AppComponent;
