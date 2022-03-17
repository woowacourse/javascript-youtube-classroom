import '../css/index.css';
import '../assets/images/not_found.png';

import { $, quickModalElement } from './util/general.js';
import { THROTTLE_DELAY } from './constants/constants.js';
import { applyThrottle } from './util/throttle.js';
import { SearchEventHandler } from './modules/handleSearchEvent.js';
import { WatchLaterVideoEventHandler } from './modules/handleWatchLaterVideoEvent.js';
import { WatchedVideoEventHandler } from './modules/handleWatchedVideoEvent.js';
import watchLaterInterface from './ui/watchLaterInterface.js';

export default function App() {
  const handleSearchEvent = new SearchEventHandler();
  const handleWatchLaterEvent = new WatchLaterVideoEventHandler();
  const handleWatchedVideoEvent = new WatchedVideoEventHandler();

  watchLaterInterface.renderWatchLaterVideos();
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearchEvent.handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearchEvent.handleSearch();
  });

  $('.video-list').addEventListener(
    'scroll',
    applyThrottle(handleSearchEvent.handleScroll, THROTTLE_DELAY),
  );

  $('.video-list').addEventListener('click', handleSearchEvent.handleSaveButtonClick);

  $('.dimmer').addEventListener('click', quickModalElement);

  $('.watch-later-nav-button').addEventListener('click', handleWatchLaterEvent.handleWatchLater);
  $('.watched-nav-button').addEventListener('click', handleWatchedVideoEvent.handleWatchedVideo);

  $('.watch-later-videos-container ul').addEventListener(
    'click',
    handleWatchLaterEvent.handleWatchedButtonClick,
  );
}

App();
