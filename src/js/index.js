import YoutubeClassRoomView from './YoutubeClassroomView';
import SearchVideoManager from './SearchVideoManager';
import { $ } from './util';

const youtubeClassRoomView = new YoutubeClassRoomView();
const searchVideoManager = new SearchVideoManager();

let keyword = '';

$('#search-modal-button').addEventListener('click', () => {
  $('#modal-container').classList.remove('hide');
});

$('.dimmer').addEventListener('click', (e) => {
  $('#modal-container').classList.add('hide');
});

$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  keyword = $('#search-input-keyword').value;
  if (searchVideoManager.isKeywordChanged(keyword)) {
    youtubeClassRoomView.initializeSearchResultVideoList();
    searchVideoManager.resetNextPageToken();
  }
  searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
    youtubeClassRoomView.updateOnSearchDataReceived(videos);
  });
});

let debounce;
function detectScroll() {
  const { scrollTop, clientHeight, scrollHeight } = $('#search-result-video-list');
  if (debounce) {
    console.log('요청 해제');
    clearTimeout(debounce);
  }

  if (scrollTop + clientHeight + 20 >= scrollHeight) {
    console.log('요청 보내기');
    debounce = setTimeout(() => {
      searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
        youtubeClassRoomView.updateOnSearchDataReceived(videos);
      });
    }, 1000);
  }
}

$('#search-result-video-list').addEventListener('scroll', detectScroll);
