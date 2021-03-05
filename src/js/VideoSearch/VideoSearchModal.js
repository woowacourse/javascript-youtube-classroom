import { CLASSNAME } from "../constants.js";
import { $ } from "../querySelector.js";
import SearchForm from "./SearchForm.js";
import KeywordHistory from "./KeywordHistory.js";
import VideoWrapper from "./VideoWrapper.js";
import store from "../store.js";

export default class VideoSearchModal {
  constructor() {
    this.$modal = $(CLASSNAME.MODAL);
    this.$modalClose = $(CLASSNAME.MODAL_CLOSE);
    this.$modalInner = $(CLASSNAME.MODAL_INNER);

    this.searchForm = new SearchForm();
    this.keywordHistory = new KeywordHistory();
    this.videoWrapper = new VideoWrapper();

    this.$modalClose.addEventListener("click", this.close.bind(this));

    store.addStateListener("items", () => {
      this.$modalInner.classList.add(CLASSNAME.HEIGHT_85_PERCENT);
    });
  }

  open() {
    this.$modal.classList.add(CLASSNAME.OPEN);
  }

  close() {
    this.$modal.classList.remove(CLASSNAME.OPEN);
  }
}
