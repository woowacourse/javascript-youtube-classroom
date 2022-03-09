import YoutubeClassRoomView from './YoutubeClassroomView';
import SearchVideoManager from './SearchVideoManager';
import { $ } from './util';
import SaveVideoManager from './SaveVideoManager';

const youtubeClassRoomView = new YoutubeClassRoomView();
const searchVideoManager = new SearchVideoManager();
const saveVideoManager = new SaveVideoManager();

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

  youtubeClassRoomView.initializeSearchResultVideoList();
  if (searchVideoManager.isKeywordChanged(keyword)) {
    searchVideoManager.resetNextPageToken();
  }
  searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
    const checkedVideos = videos.map((video) => ({
      ...video,
      saved: saveVideoManager.findVideoById(video.id),
    }));
    youtubeClassRoomView.updateOnSearchDataReceived(checkedVideos);
  });
});

let debounce;
function detectScroll() {
  const { scrollTop, clientHeight, scrollHeight } = $('#search-result-video-list');
  if (debounce) {
    clearTimeout(debounce);
  }

  if (scrollTop + clientHeight + 20 >= scrollHeight) {
    debounce = setTimeout(() => {
      searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
        const checkedVideos = videos.map((video) => ({
          ...video,
          saved: saveVideoManager.findVideoById(video.id),
        }));
        youtubeClassRoomView.updateOnSearchDataReceived(checkedVideos);
      });
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
