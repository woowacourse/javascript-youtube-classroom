import { searchRequest } from './searchRequest.js';

export const onSearchByKeyword = ({ target }) => {
  if (target.dataset.js !== 'youtube-search-modal__chip') {
    return;
  }

  const keyword = target.innerText;
  searchRequest(keyword);
};
