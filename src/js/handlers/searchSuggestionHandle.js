import { $ } from '../utils/querySelector.js';
import GoogleSuggestAPI from '../service/GoogleSuggestAPI.js';
import searchSuggestionUI from '../views/searchSuggestion/searchSuggestionUI.js';

const googleSuggestAPI = new GoogleSuggestAPI();

const handleSuggestion = targetKeyword => {
  if (targetKeyword.length == 0) {
    return;
  }

  const response = googleSuggestAPI.callSuggestAPI(targetKeyword);

  response.then(data => {
    const isValidData = data[1].length !== 0;
    const isEmptySuggestionList = $('#suggestion-list').children.length === 0;

    if (isValidData && isEmptySuggestionList) {
      const suggestions = data[1];
      searchSuggestionUI.renderSuggestionList(suggestions);
    }
  });
};

export const handleKeyupSuggestion = e => {
  const targetKeyword = e.target.value;

  $('.suggestion').hidden = true;
  $('#suggestion-list').replaceChildren();

  if (e.key === 'Enter') {
    return;
  }

  handleSuggestion(targetKeyword);
};

export const handleClickSuggestion = e => {
  const targetKeyword = e.target.value;

  $('.suggestion').hidden = true;
  $('#suggestion-list').replaceChildren();

  handleSuggestion(targetKeyword);
};
