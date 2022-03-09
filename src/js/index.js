import YoutubeClassRoomView from './YoutubeClassroomView';
import SearchVideoManager from './SearchVideoManager';
import { $ } from './util';
import SaveVideoManager from './SaveVideoManager';
import { validateSearchKeyword } from './validation';

const youtubeClassRoomView = new YoutubeClassRoomView();
const searchVideoManager = new SearchVideoManager();
const saveVideoManager = new SaveVideoManager();

$('#search-modal-button').addEventListener('click', () => {
  $('#modal-container').classList.remove('hide');
});

$('.dimmer').addEventListener('click', (e) => {
  $('#modal-container').classList.add('hide');
});

const searchKeyword = (keyword) => {
  youtubeClassRoomView.updateOnLoading();
  searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
    const checkedVideos = videos.map((video) => ({
      ...video,
      saved: saveVideoManager.findVideoById(video.id),
    }));
    youtubeClassRoomView.updateOnSearchDataReceived(checkedVideos);
  });
};

$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = $('#search-input-keyword').value;
  try {
    validateSearchKeyword(keyword);
  } catch ({ message }) {
    alert(message);
    return;
  }
  youtubeClassRoomView.initializeSearchResultVideoList();
  if (searchVideoManager.isKeywordChanged(keyword)) {
    searchVideoManager.resetNextPageToken();
  }
  searchKeyword(keyword);
});

let debounce;
function detectScroll() {
  const { scrollTop, clientHeight, scrollHeight } = $('#search-result-video-list');
  if (debounce) {
    clearTimeout(debounce);
  }

  if (scrollTop + clientHeight + 20 >= scrollHeight) {
    debounce = setTimeout(() => {
      searchKeyword($('#search-input-keyword').value);
    }, 1000);
  }
}

$('#search-result-video-list').addEventListener('scroll', detectScroll);

$('#search-result-video-list').addEventListener('click', ({ target }) => {
  if (target.tagName === 'BUTTON') {
    const { videoId } = target.parentNode.dataset;
    try {
      saveVideoManager.saveVideoById(videoId);
    } catch (e) {
      alert(e.message);
      return;
    }
    target.remove();
  }
});
