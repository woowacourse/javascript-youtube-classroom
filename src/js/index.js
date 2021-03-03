import CLASSNAME from "./constants.js";
import API_KEY from "./key.js";
import { $ } from "./querySelector.js";

const $modal = $(CLASSNAME.MODAL);
const $modalClose = $(CLASSNAME.MODAL_CLOSE);
const $videoSearchTab = $(CLASSNAME.VIDEO_SEARCH_TAB);
const $youtubeSearchForm = $(CLASSNAME.YOUTUBE_SEARCH_FORM);

const onModalShow = () => {
  $modal.classList.add(CLASSNAME.OPEN);
};

const onModalClose = () => {
  $modal.classList.remove(CLASSNAME.OPEN);
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const query =
    event.target.elements[CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT].value;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&regionCode=kr&safeSearch=strict&q=${query}}&key=${API_KEY}`
  );

  if (response.ok) {
    // const json = await response.json();
    // console.log(json);
  } else {
    // alert(`HTTP-Error: ${response.status}`);
  }
};

$videoSearchTab.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$youtubeSearchForm.addEventListener("submit", handleFormSubmit);
