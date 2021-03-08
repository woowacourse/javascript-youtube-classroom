function createKeywordChipTemplate(keyword) {
  return `<span class="js-latest-keyword chip">${keyword}</span>`;
}

function createKeywordListTemplate(latestKeywords = []) {
  return `<span class="text-gray-700">최근 검색어: </span>
  ${latestKeywords
    .map(keyword => createKeywordChipTemplate(keyword))
    .reverse()
    .join('')}`;
}

export default createKeywordListTemplate;
