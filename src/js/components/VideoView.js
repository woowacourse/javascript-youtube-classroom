import { $, popMessage } from "../utils/dom.js";
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
    this.$snackbar = $(".snackbar");
  }

  bindEvent() {
    this.$videoViewVideoWrapper.addEventListener("click", e => {
      if (e.target.classList.contains("clip__watched-check")) {
        this.handleCheckWatched(e);
      }

      if (e.target.classList.contains("clip__trash-can")) {
        this.handleRemoveSaved(e);
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
    const message = `${this.clickedMenu === "watch-later" ? "본" : "볼"} 영상으로 이동되었습니다.`;
    popMessage(this.$snackbar, message);
  }

  handleRemoveSaved(e) {
    if (confirm("정말 삭제하시겠습니까?")) {
      const removeVideoId = e.target.closest(".clip__actions").dataset.videoId;
      const savedVideos = this.savedVideos.filter(video => video.videoId !== removeVideoId);

      this.setState({ savedVideos });
      setDataToLocalStorage(STORAGE.SAVED_VIDEOS, this.savedVideos);
      popMessage(this.$snackbar, "성공적으로 삭제되었습니다.");
    }
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
