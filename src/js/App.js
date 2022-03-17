import { $, throttle } from './util/general.js';
import { THROTTLE_DELAY } from './constants/constants.js';
import { handleSearch, handleScroll, handleSaveButtonClick } from './eventHandlers/searchEvents.js';
import userInterface from './ui/userInterface.js';
import storage from './storage/storage.js';

export default function App() {
  const savedVideos = storage.getSavedVideos();
  if (savedVideos) {
    userInterface.renderSavedVideoItems();
  } else {
    userInterface.renderNothingSavedImage();
  }
  // 이벤트 등록
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch();
  });

  $('.video-list').addEventListener('scroll', throttle(handleScroll, THROTTLE_DELAY));

  $('.video-list').addEventListener('click', handleSaveButtonClick);

  $('.dimmer').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#going-watch-button').addEventListener('click', () => {
    if (!$('.saved-video-list').classList.contains('watched')) {
      $('.saved-video-list').classList.toggle('watched');
      userInterface.renderSavedVideoItems();
    }
  });

  $('#watched-button').addEventListener('click', () => {
    if ($('.saved-video-list').classList.contains('watched')) {
      $('.saved-video-list').classList.toggle('watched');
      $('.saved-video-list').replaceChildren();
    }
  });
}
