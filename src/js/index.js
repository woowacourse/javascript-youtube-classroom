import YoutubeClassRoomView from './YoutubeClassroomView';
import SearchVideoManager from './SearchVideoManager';
import { $ } from './util';

const youtubeClassRoomView = new YoutubeClassRoomView();
const searchVideoManager = new SearchVideoManager();

$('#search-modal-button').addEventListener('click', () => {
  $('#modal-container').classList.remove('hide');
});

$('.dimmer').addEventListener('click', (e) => {
  $('#modal-container').classList.add('hide');
});

$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = $('#search-input-keyword').value;
  if (searchVideoManager.isKeywordChanged(keyword)) {
    youtubeClassRoomView.initializeSearchResultVideoList();
  }
  searchVideoManager.fetchYoutubeData(keyword).then((videos) => {
    youtubeClassRoomView.updateOnSearchDataReceived(videos);
  });
});
