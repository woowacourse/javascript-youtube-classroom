import { CLASSNAME } from "../constants.js";
import { $c } from "../utils/querySelector.js";
import SearchForm from "./SearchForm.js";
import KeywordHistory from "./KeywordHistory.js";
import VideoWrapper from "./VideoWrapper.js";
import SavedVideosCount from "./SavedVideosCount.js";

export default class VideoSearchModal {
  constructor() {
    this.$modal = $c(CLASSNAME.MODAL);
    this.$modalClose = $c(CLASSNAME.MODAL_CLOSE);
    this.$modalInner = $c(CLASSNAME.MODAL_INNER);

    this.videoWrapper = new VideoWrapper();
    this.searchForm = new SearchForm();
    this.keywordHistory = new KeywordHistory();
    this.savedVideosCount = new SavedVideosCount();

    this.$modalClose.addEventListener("click", this.close.bind(this));
  }

  open() {
    this.$modal.classList.add(CLASSNAME.OPEN);
  }

  close() {
    this.$modal.classList.remove(CLASSNAME.OPEN);
  }
}
