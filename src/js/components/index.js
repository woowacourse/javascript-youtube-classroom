import { isEmptyKeyword } from '../utils/validation';
import Component from './Component';
import SearchModalComponent from './SearchModalComponent';
import { youtubeAPIFetcher } from '../modules/fetcher';
import webStore from '../modules/webStore';
import { API_PATHS, API_URL } from '../constants';
import { setState, getState } from '../modules/stateStore';
import Video from '../modules/video';
import { findVideoInVideoList, parserVideos } from '../utils/util';
class AppComponent extends Component {
  searchModalComponent = null;

  $searchModalButton = null;

  constructor(parentElement, state) {
    super(parentElement, state);
    this.mount();
    this.bindEventHandler();
  }

  mount() {
    const template = this.generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
    this.$searchModalButton = document.querySelector('#search-modal-button');

    this.searchModalComponent = new SearchModalComponent({
      parentElement: this.parentElement,
      state: {},
      handlers: {
        onClickOutsideModal: this.onClickOutsideModal,
        onSubmitSearchKeyword: this.onSubmitSearchKeyword,
        onClickSaveButton: this.onClickSaveButton,
      },
    });
  }

  onClickSearchModalButton = () => {
    setState('isModalShow', true);
  };

  onClickOutsideModal = () => {
    setState('isModalShow', false);
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
      setState('videoList', videoList);
    } catch ({ message }) {
      alert(message);
    }
  }

  onScrollVideoContainer() {}

  onClickSaveButton(saveVideoId) {
    const videoList = getState('videoList');

    const saveVideo = findVideoInVideoList(videoList, saveVideoId);

    try {
      webStore.setSavedVideoList(saveVideo.getVideoInfo());
    } catch ({ message }) {
      alert(message);
    }
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
}
export default AppComponent;
