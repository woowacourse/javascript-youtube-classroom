import searchHistory from "../state/searchHistory.js";

export default function getKeywordHistoryTemplate() {
  return searchHistory
    .getKeywordAll()
    .map((keyword) => `<li><a class="chip">${keyword}</a></li>`)
    .join("");
}
