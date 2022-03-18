import { $ } from '../../utils/querySelector.js';

const searchSuggestionUI = {
  renderSuggestionList: suggestions => {
    suggestions.forEach(suggestion => {
      $('#suggestion-list').insertAdjacentHTML('beforeend', `<li>${suggestion}</li>`);
    });

    $('.suggestion').hidden = false;
  },
};

export default searchSuggestionUI;
