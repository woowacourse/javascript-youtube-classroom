import debounce, { SUGGESTION_DEBOUNCE_DELAY } from '../../utils/debounce.js';
import { $ } from '../../utils/querySelector.js';
import {
  handleKeyupSuggestion,
  handleClickSuggestion,
} from '../../handlers/searchSuggestionHandle.js';

const bindSearchSuggestionEvents = () => {
  $('#search-input-keyword').addEventListener(
    'keyup',
    debounce(handleKeyupSuggestion, SUGGESTION_DEBOUNCE_DELAY),
  );

  $('#search-input-keyword').addEventListener(
    'click',
    debounce(handleClickSuggestion, SUGGESTION_DEBOUNCE_DELAY),
  );

  $('#suggestion-list').addEventListener('click', e => {
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
};

export default bindSearchSuggestionEvents;
