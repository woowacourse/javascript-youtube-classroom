import { $ } from '../../utils/querySelector.js';

const searchSuggestionUI = {
  renderSuggestionList: suggestions => {
    suggestions.forEach(suggestion => {
      $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
    });
    if ($('.video-list').children.length === 0) {
      $('.suggestion').hidden = false;
    }
  },
};

export default searchSuggestionUI;
