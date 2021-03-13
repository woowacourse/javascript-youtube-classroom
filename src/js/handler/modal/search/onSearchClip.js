import { searchRequest } from './searchRequest.js';

export const onSearchClip = (event) => {
  event.preventDefault();

  const $input = event.target.elements['youtube-search-modal__input'];
  const keyword = $input.value;
  searchRequest(keyword);

  $input.value = '';
};
