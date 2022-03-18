import { CONFIRM_MESSAGES } from "../utils/contants.js";
import { $ } from "../utils/dom.js";
import { getEmptyClassroomTemplate, getFrameTemplate } from "../utils/templates.js";

export default class Classroom {
  constructor({ videoManager }) {
    this.classroomList = $(".classroom__list");
    this.emptyContainer = $(".classroom__empty");
    this.classroomList.addEventListener("click", this.handleVideoOption);

    this.videoManager = videoManager;
    this.videoManager.subscribe(this.renderVideos);

    this.isWatched = false;
    this.renderVideos();
  }

  handleVideoOption = ({ target }) => {
    const { id } = target.parentNode.dataset;

    if (target.classList.contains("watched-button")) {
      this.videoManager.toggleWatchVideo(id);
    }
    if (target.classList.contains("delete-button")) {
      confirm(CONFIRM_MESSAGES.DELETE) && this.videoManager.removeVideo(id);
    }
  };

  setWatchState(state) {
    this.isWatched = state;
    this.renderVideos();
  }

  initClassroom() {
    this.classroomList.replaceChildren();
    this.emptyContainer.replaceChildren();
  }

  renderVideos = () => {
    this.initClassroom();

    if (this.videoManager.getSavedVideos().filter((video) => video.watched === this.isWatched).length === 0) {
      this.renderEmptyClassroom();
      return;
    }

    this.classroomList.insertAdjacentHTML(
      "beforeend",
      this.videoManager
        .getSavedVideos()
        .filter((video) => video.watched === this.isWatched)
        .map((video) => getFrameTemplate(video))
        .join(""),
    );
  };

  renderEmptyClassroom() {
    this.emptyContainer.insertAdjacentHTML("beforeend", getEmptyClassroomTemplate);
  }
}
