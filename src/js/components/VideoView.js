import { $ } from "../utils/dom.js";
import { getDataFromLocalStorage } from "../utils/localStorage.js";
import { SECTION, STORAGE } from "../utils/constants.js";
import { createVideoTemplate } from "../utils/templates.js";

class VideoView {
  constructor() {
    this.selectDOM();
    this.initState();
  }

  async initState() {
    this.savedVideos = getDataFromLocalStorage(STORAGE.SAVED_VIDEOS, []);
    // console.log(JSON.stringify(this.savedVideos));
    this.render();
  }

  selectDOM() {
    this.$target = $(".video-view");
    this.$videoViewVideoWrapper = $(".video-view__video-wrapper");
  }

  render() {
    this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
      ? this.savedVideos.map(video => createVideoTemplate(video, SECTION.MAIN)).join("")
      : createNoWatchLaterTemplate();
  }
}

const createNoWatchLaterTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-watch-later-image' src='src/images/status/no_watch_later_video.png' alt='결과 없음'>
    <p>볼 영상이 없습니다💦💦</p>
  </div>`;

export default VideoView;
