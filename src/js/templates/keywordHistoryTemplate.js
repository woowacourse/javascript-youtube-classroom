import searchHistory from "../state/searchHistory.js";

export default function getKeywordHistoryElement() {
  return searchHistory
    .getKeywordAll()
    .map((keyword) => {
      const rejoinedKeyword = keyword.replace(" ", "+");

      return `<li>
        <a class="chip">
          <div class="icon" data-keyword=${rejoinedKeyword}>${keyword}</div>
          <button class="small-btn" type="submit">
            <i class="fas fa-window-close ml-2 js-remove-btn" data-keyword=${rejoinedKeyword}></i>
          </button>
        </a>
      </li>`;
    })
    .join("");
}
