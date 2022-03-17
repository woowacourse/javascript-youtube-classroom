import { $ } from './util/querySelector.js';
import throttle, { SCROLL_THROTTLE_DELAY } from './util/throttle.js';
import debounce from './util/debounce.js';
import { handleSearch, handleScrollSearch } from './handlers/searchHandle.js';
import { handleSaveButtonClick } from './handlers/saveVideoHandle.js';
import {
  handleGoingWatchButtonClick,
  handleWatchedButtonClick,
} from './handlers/showSavedVideosHandle.js';
import { handleModalClose } from './handlers/modalHandle.js';

import mainPageUI from './ui/mainPage/mainPageUI.js';
import videoStorage from './localStorage/videoStorage.js';

export default function App() {
  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideos(savedVideos);

  // 이벤트 등록
  $('.search-input').addEventListener('submit', e => {
    e.preventDefault();
    $('.suggestion').hidden = true;
    handleSearch();
  });

  $('.video-list').addEventListener('scroll', throttle(handleScrollSearch, SCROLL_THROTTLE_DELAY));

  $('.video-list').addEventListener('click', handleSaveButtonClick);
  //
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('.dimmer').addEventListener('click', handleModalClose);
  //
  $('#going-watch-button').addEventListener('click', handleGoingWatchButtonClick);

  $('#watched-button').addEventListener('click', handleWatchedButtonClick);

  //
  $('.saved-video-list').addEventListener('click', e => {
    if (e.target.classList.contains('video-item__watched-button')) {
      const videoItem = e.target.parentElement.parentElement;
      videoItem.remove();
      const savedVideos = videoStorage.getSavedVideos();
      const newSavedVideos = savedVideos.map(savedVideo => {
        if (savedVideo.id === videoItem.dataset.videoId) {
          savedVideo.watched = true;
          return savedVideo;
        }
        return savedVideo;
      });
      videoStorage.setSavedVideos(newSavedVideos);
    }
    if (e.target.classList.contains('video-item__delete-button')) {
      const videoItem = e.target.parentElement.parentElement;
      videoItem.remove();
      const savedVideos = videoStorage.getSavedVideos();
      const newSavedVideos = savedVideos.filter(
        savedVideo => savedVideo.id !== videoItem.dataset.videoId,
      );
      if (newSavedVideos.length === 0) {
        videoStorage.removeSavedVideo();
        $('.saved-video').hidden = true;
        mainPageUI.renderNothingSavedImage();
        return;
      }
      videoStorage.setSavedVideos(newSavedVideos);
    }
  });

  ////////////////////////

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
