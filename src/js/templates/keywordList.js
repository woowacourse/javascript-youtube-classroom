function keywordChipTemplate(keyword) {
  return `<span class="js-latest-keyword chip">${keyword}</span>`;
}

function keywordListTemplate(latestKeywords = []) {
  return `<span class="text-gray-700">최근 검색어: </span>
  ${latestKeywords
    .map(keyword => keywordChipTemplate(keyword))
    .reverse()
    .join('')}`;
}

export default keywordListTemplate;
