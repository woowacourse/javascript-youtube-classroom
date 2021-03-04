function createKeywordChip(keyword) {
  return `<span class="js-latest-keyword chip">${keyword}</span>`;
}

function createKeywordList(latestKeywords) {
  return `<span class="text-gray-700">최근 검색어: </span>
  ${latestKeywords
    .map(keyword => createKeywordChip(keyword))
    .reverse()
    .join('')}`;
}

export default createKeywordList;
