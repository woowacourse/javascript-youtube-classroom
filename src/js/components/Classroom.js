import { $ } from "../utils/dom.js";
import { getEmptyClassroomTemplate, getFrameTemplate } from "../utils/templates.js";

export default class Classroom {
  constructor({ saveVideoManager }) {
    this.classroomList = $(".classroom__list");
    this.emptyContainer = $(".classroom__empty");

    this.saveVideoManager = saveVideoManager;
    this.saveVideoManager.subscribe(this.addVideo);

    this.savedVideos = this.saveVideoManager.getSavedVideos();
    this.renderVideos();
  }

  renderVideos() {
    if (this.savedVideos.length === 0) {
      this.renderEmptyClassroom();
      return;
    }
    this.classroomList.replaceChildren();
    this.classroomList.insertAdjacentHTML(
      "beforeend",
      this.savedVideos.map((video) => getFrameTemplate(video)).join(""),
    );
  }

  renderEmptyClassroom() {
    this.emptyContainer.insertAdjacentHTML("beforeend", getEmptyClassroomTemplate);
  }

  addVideo = () => {
    const updatedVideos = this.saveVideoManager.getSavedVideos();
    if (updatedVideos.length > 0) {
      this.emptyContainer.replaceChildren();
    }
    const newVideo = updatedVideos.find((video) => !this.savedVideos.includes(video));
    this.classroomList.insertAdjacentHTML("beforeend", getFrameTemplate(newVideo));
    this.savedVideos = this.saveVideoManager.getSavedVideos();
  };
}
