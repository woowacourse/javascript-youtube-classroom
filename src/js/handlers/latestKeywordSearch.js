import dom from '../library/DOMelements.js';

function handleLatestKeywordSearch(e) {
  if (!e.target.classList.contains('js-latest-keyword')) return;

  const latestKeyword = e.target.innerText;

  dom.$videoSearchForm.elements['video-search-input'].value = latestKeyword;
  dom.$videoSearchForm.elements['video-search-submit'].click();
}

export default handleLatestKeywordSearch;
