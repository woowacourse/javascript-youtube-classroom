import { $ } from "../utils/dom.js";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils/localStorage.js";
import { SECTION, STORAGE } from "../utils/constants.js";
import { createVideoTemplate } from "../utils/templates.js";

class VideoView {
  constructor() {
    this.selectDOM();
    this.initState();
    this.bindEvent();
  }

  async initState() {
    this.savedVideos = getDataFromLocalStorage(STORAGE.SAVED_VIDEOS, []);
    this.clickedMenu = "watch-later";

    this.render();
  }

  setState({ savedVideos, clickedMenu }) {
    this.savedVideos = savedVideos ?? this.savedVideos;
    this.clickedMenu = clickedMenu ?? this.clickedMenu;

    this.render();
  }

  selectDOM() {
    this.$target = $(".video-view");
    this.$videoViewVideoWrapper = $(".video-view__video-wrapper");
  }

  bindEvent() {
    this.$videoViewVideoWrapper.addEventListener("click", e => {
      if (e.target.classList.contains("clip__watched-check")) {
        this.handleCheckWatched(e);
      }
    });
  }

  handleCheckWatched(e) {
    const watchedVideoId = e.target.closest(".clip__actions").dataset.videoId;
    const savedVideos = this.savedVideos.map(video => {
      if (video.videoId === watchedVideoId) {
        video.isWatched = !video.isWatched;
      }

      return video;
    });

    this.setState({ savedVideos });
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, this.savedVideos);
  }

  render() {
    if (this.clickedMenu === "watch-later") {
      this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
        ? this.savedVideos
            .filter(video => !video.isWatched)
            .map(video => createVideoTemplate(video, SECTION.MAIN))
            .join("")
        : createNoWatchLaterTemplate();
    } else {
      this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
        ? this.savedVideos
            .filter(video => video.isWatched)
            .map(video => createVideoTemplate(video, SECTION.MAIN))
            .join("")
        : createNoWatchLaterTemplate();
    }
  }
}

const createNoWatchLaterTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-watch-later-image' src='src/images/status/no_watch_later_video.png' alt='결과 없음'>
    <p>볼 영상이 없습니다💦💦</p>
  </div>`;

export default VideoView;
