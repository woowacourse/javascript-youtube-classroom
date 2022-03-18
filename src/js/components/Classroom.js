import { $ } from "../utils/dom.js";
import { getEmptyClassroomTemplate, getFrameTemplate } from "../utils/templates.js";

export default class Classroom {
  constructor({ saveVideoManager }) {
    this.classroom = $(".classroom");
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
    this.classroom.replaceChildren();
    this.classroom.insertAdjacentHTML("beforeend", this.savedVideos.map((video) => getFrameTemplate(video)).join(""));
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
    this.classroom.insertAdjacentHTML("beforeend", getFrameTemplate(newVideo));
    this.savedVideos = this.saveVideoManager.getSavedVideos();
  };
}
