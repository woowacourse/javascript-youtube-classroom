import searchHistory from "../state/searchHistory.js";

export default function getKeywordHistoryTemplate() {
  return searchHistory
    .getKeywordAll()
    .map(
      (keyword) =>
        `<li data-keyword=${keyword}><a class="chip"><div class="icon">${keyword}</div></a></li>`
    )
    .join("");
}
