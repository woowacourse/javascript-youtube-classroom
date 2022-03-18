import mainPageUI from './views/mainPage/mainPageUI.js';
import videoStorage from './localStorage/videoStorage.js';
import bindMainPageEvents from './views/mainPage/mainPageEvents.js';
import bindModalEvents from './views/modal/modalEvents.js';
import bindSearchSuggestionEvents from './views/searchSuggestion/searchSuggestionEvents.js';

export default function App() {
  window.addEventListener('DOMContentLoaded', () => {
    bindMainPageEvents();
    bindModalEvents();
    bindSearchSuggestionEvents();
  });

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);
}
