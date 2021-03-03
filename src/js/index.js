import Search from "./search/Search.js";
import elements from "./utils/elements.js";

const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
  elements.$searchForm.elements["search-keyword"].focus();
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

new Search().init();
