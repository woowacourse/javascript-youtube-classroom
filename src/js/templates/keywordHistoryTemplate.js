import searchHistory from "../state/searchHistory.js";

export default function getKeywordHistoryTemplate() {
  return searchHistory
    .getKeywordAll()
    .map(
      (keyword) =>
        `<li>
          <a class="chip">
            <div class="icon" data-keyword=${keyword}>${keyword}</div>
            <button type="button" class="small-btn">
              <i class="fas fa-window-close ml-2 js-remove-btn" data-keyword=${keyword}></i>
            </button>
          </a>
        </li>`
    )
    .join("");
}
