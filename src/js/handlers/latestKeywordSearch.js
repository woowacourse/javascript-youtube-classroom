import { search } from '../viewController.js';

function handleLatestKeywordSearch({ target }) {
  if (!target.classList.contains('js-latest-keyword')) return;

  const latestKeyword = target.innerText;

  search(latestKeyword);
}

export default handleLatestKeywordSearch;
