import { $, throttle, debounce } from './util/general.js';
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

  $('.video-list').addEventListener('scroll', throttle(handleScroll, THROTTLE_DELAY));

  $('.video-list').addEventListener('click', handleSaveButtonClick);

  $('.dimmer').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
    $('.video-list').replaceChildren();
    $('#search-input-keyword').value = '';
    $('.saved-video').hidden = false;
    $('.saved-video-list').replaceChildren();
    userInterface.renderSavedVideoItems();
  });

  $('#going-watch-button').addEventListener('click', () => {
    if (!$('.saved-video-list').classList.contains('watched')) {
      $('#going-watch-button').classList.add('checked');
      $('#watched-button').classList.remove('checked');
      $('.saved-video-list').classList.add('watched');
      $('.saved-video-list').replaceChildren();
      userInterface.renderSavedVideoItems();
    }
  });

  $('#watched-button').addEventListener('click', () => {
    if ($('.saved-video-list').classList.contains('watched')) {
      $('#watched-button').classList.add('checked');
      $('#going-watch-button').classList.remove('checked');
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
      console.log(newSavedVideos.length);
      if (newSavedVideos.length === 0) {
        storage.removeSavedVideo();
        $('.saved-video').hidden = true;
        userInterface.renderNothingSavedImage();
        return;
      }
      storage.setSavedVideos(newSavedVideos);
    }
  });

  $('.search-input').addEventListener('submit', e => {
    e.preventDefault();
    $('.suggestion').hidden = true;
    handleSearch();
  });

  $('#search-input-keyword').addEventListener(
    'keyup',
    debounce(e => {
      if (e.key !== 'Enter') {
        $('#suggestion-list').replaceChildren();
        $('.suggestion').hidden = true;
        console.log(e.target.value.length);
        if (e.target.value.length == 0) {
          $('.suggestion').hidden = true;
          return;
        }
        fetch(
          convertToCorsUrl(
            `https://suggestqueries.google.com/complete/search?output=firefox&q=${e.target.value}`,
          ),
        )
          .then(res => res.json())
          .then(data => {
            if (data[1].length !== 0) {
              data[1].forEach(suggestion => {
                $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
              });
              $('.suggestion').hidden = false;
            }
          });
      }
    }, 300),
  );

  $('#suggestion-list').addEventListener('click', e => {
    e.preventDefault();
    if (e.target.localName === 'li') {
      $('#search-input-keyword').value = e.target.textContent;
      $('.suggestion').hidden = true;
    }
  });

  $('#search-input-keyword').addEventListener('focusout', e => {
    setTimeout(() => {
      $('.suggestion').hidden = true;
    }, 150);
  });

  $('#search-input-keyword').addEventListener('click', e => {
    $('#suggestion-list').replaceChildren();
    $('.suggestion').hidden = true;
    if (e.target.value.length == 0) {
      $('.suggestion').hidden = true;
      return;
    }
    fetch(
      convertToCorsUrl(
        `https://suggestqueries.google.com/complete/search?output=firefox&q=${e.target.value}`,
      ),
    )
      .then(res => res.json())
      .then(data => {
        if (data[1].length !== 0) {
          data[1].forEach(suggestion => {
            $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
          });
          $('.suggestion').hidden = false;
        }
      });
  });
}

function convertToCorsUrl(url) {
  //Cors-Anywhere형식의 url생성
  var protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
  return protocol + '//cors-anywhere.herokuapp.com/' + url;
}
