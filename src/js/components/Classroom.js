import { $ } from "../utils/dom.js";
import { getFrameTemplate } from "../utils/templates.js";

export default class Classroom {
  constructor({ saveVideoManager }) {
    this.classroom = $(".classroom");

    this.saveVideoManager = saveVideoManager;
    this.saveVideoManager.subscribe(this.updateVideos);

    this.savedVideos = this.saveVideoManager.getSavedVideos();
    this.renderVideos();
  }

  renderVideos() {
    this.classroom.replaceChildren();
    this.classroom.insertAdjacentHTML("beforeend", this.savedVideos.map((video) => getFrameTemplate(video)).join(""));
  }

  updateVideos = () => {
    const updatedVideos = this.saveVideoManager.getSavedVideos();
    const newVideo = updatedVideos.find((video) => !this.savedVideos.includes(video));
    this.classroom.insertAdjacentHTML("beforeend", getFrameTemplate(newVideo));
    this.savedVideos = this.saveVideoManager.getSavedVideos();
  };
}
