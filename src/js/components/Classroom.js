import { $ } from "../utils/dom.js";
import { INFOMATION_MESSAGES } from "../utils/contants.js";
import { getClassroomVideoTemplate, getEmptyClassroomTemplate, getIframeTemplate } from "../utils/templates.js";

export default class Classroom {
  #isWatched = false;

  constructor({ videoManager }) {
    this.classroom = $(".classroom");
    this.classroomList = $(".classroom__list", this.classroom);
    this.emptyContainer = $(".classroom__empty", this.classroom);
    this.classroomList.addEventListener("click", this.#handleVideoOption);

    this.videoManager = videoManager;
    this.videoManager.subscribe(this.#renderVideos);

    this.#renderVideos();
  }

  setWatchState(state) {
    this.#isWatched = state;
    this.#renderVideos();
  }

  #handleVideoOption = ({ target }) => {
    const { id } = target.parentNode.dataset;

    if (target.classList.contains("video-item__start-button")) {
      const videoItem = target.parentNode.parentNode;
      const thumnail = videoItem.firstElementChild;
      thumnail.remove();
      videoItem.insertAdjacentHTML("afterbegin", getIframeTemplate(id));
    }
    if (target.classList.contains("video-item__watched-button")) {
      this.videoManager.toggleWatchVideo(id);
    }
    if (target.classList.contains("video-item__delete-button")) {
      confirm(INFOMATION_MESSAGES.ASK_DELETE) && this.videoManager.removeVideo(id);
    }
  };

  #initClassroom() {
    this.classroomList.replaceChildren();
    this.emptyContainer.replaceChildren();
  }

  #renderVideos = () => {
    this.#initClassroom();

    const videos = this.videoManager.getSavedVideos().filter((video) => video.watched === this.#isWatched);

    if (videos.length === 0) {
      this.#renderEmptyClassroom();
      return;
    }

    this.classroomList.insertAdjacentHTML(
      "beforeend",
      videos.map((video) => getClassroomVideoTemplate(video)).join(""),
    );
  };

  #renderEmptyClassroom() {
    this.emptyContainer.insertAdjacentHTML("beforeend", getEmptyClassroomTemplate);
  }
}
