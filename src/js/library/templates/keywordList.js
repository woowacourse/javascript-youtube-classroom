import state from '../state.js';

function createKeywordChip(keyword) {
  return `<span class="js-latest-keyword chip">${keyword}</span>`;
}

function createKeywordList() {
  return `<span class="text-gray-700">최근 검색어: </span>
  ${state.latestKeywords
    .map(keyword => createKeywordChip(keyword))
    .reverse()
    .join('')}`;
}

export default createKeywordList;
