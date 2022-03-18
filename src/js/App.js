import mainPageUI from './views/mainPage/mainPageUI.js';
import videoStorage from './localStorage/videoStorage.js';
import bindMainPageEvents from './views/mainPage/mainPageEvents.js';
import bindModalEvents from './views/modal/modalEvents.js';

export default function App() {
  bindMainPageEvents();
  bindModalEvents();

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);
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
