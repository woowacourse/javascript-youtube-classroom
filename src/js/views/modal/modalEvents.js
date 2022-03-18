import { $ } from '../../utils/querySelector.js';
import throttle, { SCROLL_THROTTLE_DELAY } from '../../utils/throttle.js';
import { handleSearch, handleScrollSearch } from '../../handlers/searchHandle.js';
import { handleSaveButtonClick } from '../../handlers/saveVideoHandle.js';
import { handleModalClose } from '../../handlers/modalHandle.js';

const bindModalEvents = () => {
  $('.search-input').addEventListener('submit', e => {
    e.preventDefault();
    handleSearch();
  });

  $('.video-list').addEventListener('scroll', throttle(handleScrollSearch, SCROLL_THROTTLE_DELAY));

  $('.video-list').addEventListener('click', handleSaveButtonClick);

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('.dimmer').addEventListener('click', handleModalClose);
};

export default bindModalEvents;
