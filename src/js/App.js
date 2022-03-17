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
    $('.saved-video-list').replaceChildren();
    userInterface.renderSavedVideoItems();
  });

  $('#going-watch-button').addEventListener('click', () => {
    if (!$('.saved-video-list').classList.contains('watched')) {
      $('.saved-video-list').classList.add('watched');
      $('.saved-video-list').replaceChildren();
      userInterface.renderSavedVideoItems();
    }
  });

  $('#watched-button').addEventListener('click', () => {
    if ($('.saved-video-list').classList.contains('watched')) {
      $('.saved-video-list').classList.remove('watched');
      $('.saved-video-list').replaceChildren();
      userInterface.renderSavedVideoItems();
    }
  });

  $('.saved-video-list').addEventListener('click', e => {
    if (e.target.classList.contains('video-item__watched-button')) {
      const videoItem = e.target.parentElement.parentElement;
      videoItem.remove();
      const savedVideos = storage.getSavedVideos();
      const newSavedVideos = savedVideos.map(savedVideo => {
        if (savedVideo.id === videoItem.dataset.videoId) {
          savedVideo.watched = true;
          return savedVideo;
        }
        return savedVideo;
      });
      storage.setSavedVideos(newSavedVideos);
    }
    if (e.target.classList.contains('video-item__delete-button')) {
      const videoItem = e.target.parentElement.parentElement;
      videoItem.remove();
      const savedVideos = storage.getSavedVideos();
      const newSavedVideos = savedVideos.filter(
        savedVideo => savedVideo.id !== videoItem.dataset.videoId,
      );
      storage.setSavedVideos(newSavedVideos);
    }
  });

  function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
  }
}
