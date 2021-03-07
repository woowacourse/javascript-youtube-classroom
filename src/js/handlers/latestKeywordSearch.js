import { search } from '../viewControllers/searchModal.js';

function handleLatestKeywordSearch({ target }) {
  if (!target.classList.contains('js-latest-keyword')) return;

  const latestKeyword = target.innerText;

  search(latestKeyword);
}

export default handleLatestKeywordSearch;
