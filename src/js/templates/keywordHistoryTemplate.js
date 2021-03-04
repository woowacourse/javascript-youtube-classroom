import searchHistory from "../state/searchHistory.js";

export default function getKeywordHistoryTemplate() {
  return searchHistory
    .getKeywordAll()
    .map((keyword) => `<a class="chip">${keyword}</a>`)
    .join("");
}
