import { $ } from './utils/querySelector.js';
import throttle, { SCROLL_THROTTLE_DELAY } from './utils/throttle.js';
import debounce from './utils/debounce.js';
import { handleSearch, handleScrollSearch } from './handlers/searchHandle.js';
import { handleSaveButtonClick } from './handlers/saveVideoHandle.js';
import {
  handleGonnaWatchToggleClick,
  handleWatchedToggleClick,
} from './handlers/showSavedVideosHandle.js';
import { handleModalClose } from './handlers/modalHandle.js';
import {
  handleWatchedButtonClick,
  handleDeleteButtonClick,
} from './handlers/savedVideoButtonHandle.js';
import mainPageUI from './ui/mainPage/mainPageUI.js';
import videoStorage from './localStorage/videoStorage.js';

export default function App() {
  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);

  // 검색 이벤트
  $('.search-input').addEventListener('submit', e => {
    e.preventDefault();
    $('.suggestion').hidden = true;
    handleSearch();
  });

  // 스크롤 이벤트
  $('.video-list').addEventListener('scroll', throttle(handleScrollSearch, SCROLL_THROTTLE_DELAY));

  // 저장 버튼 클릭 이벤트
  $('.video-list').addEventListener('click', handleSaveButtonClick);

  // 검색 버튼 클릭 이벤트
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  // 모달 외의 영역 클릭 이벤트
  $('.dimmer').addEventListener('click', handleModalClose);

  // 볼 영상 버튼 클릭
  $('#gonna-watch-button').addEventListener('click', handleGonnaWatchToggleClick);

  // 본 영상 버튼 클릭
  $('#watched-button').addEventListener('click', handleWatchedToggleClick);

  // 영상 저장, 삭제 버튼
  $('.saved-video-list').addEventListener('click', e => {
    const isWatchedButtonClick = e.target.classList.contains('video-item__watched-button');
    const isDeleteButtonClick = e.target.classList.contains('video-item__delete-button');

    if (isWatchedButtonClick) {
      handleWatchedButtonClick(e);
    }
    if (isDeleteButtonClick) {
      handleDeleteButtonClick(e);
    }
  });
}
///////////////////// 검색어 추천

//   $('.search-input').addEventListener('submit', e => {
//     e.preventDefault();
//     handleSearch();
//     $('.suggestion').hidden = true;
//   });

//   $('#search-input-keyword').addEventListener(
//     'keyup',
//     debounce(e => {
//       $('.suggestion').hidden = true;
//       if (e.key !== 'Enter') {
//         $('#suggestion-list').replaceChildren();
//         $('.suggestion').hidden = true;
//         if (e.target.value.length == 0) {
//           $('.suggestion').hidden = true;
//           return;
//         }
//         fetch(
//           convertToCorsUrl(
//             `https://suggestqueries.google.com/complete/search?output=firefox&q=${e.target.value}`,
//           ),
//         )
//           .then(res => res.json())
//           .then(data => {
//             if (data[1].length !== 0) {
//               data[1].forEach(suggestion => {
//                 $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
//               });
//               $('.suggestion').hidden = false;
//             }
//           });
//       }
//     }, 200),
//   );

//   $('#suggestion-list').addEventListener('click', e => {
//     e.preventDefault();
//     if (e.target.localName === 'li') {
//       $('#search-input-keyword').value = e.target.textContent;
//       $('.suggestion').hidden = true;
//     }
//   });

//   $('#search-input-keyword').addEventListener('focusout', e => {
//     setTimeout(() => {
//       $('.suggestion').hidden = true;
//     }, 150);
//   });

//   $('#search-input-keyword').addEventListener('click', e => {
//     $('#suggestion-list').replaceChildren();
//     $('.suggestion').hidden = true;
//     if (e.target.value.length == 0) {
//       $('.suggestion').hidden = true;
//       return;
//     }
//     fetch(
//       convertToCorsUrl(
//         `https://suggestqueries.google.com/complete/search?output=firefox&q=${e.target.value}`,
//       ),
//     )
//       .then(res => res.json())
//       .then(data => {
//         if (data[1].length !== 0) {
//           data[1].forEach(suggestion => {
//             $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
//           });
//           $('.suggestion').hidden = false;
//         }
//       });
//   });
// }

// function convertToCorsUrl(url) {
//   //Cors-Anywhere형식의 url생성
//   var protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
//   return protocol + '//cors-anywhere.herokuapp.com/' + url;
// }
