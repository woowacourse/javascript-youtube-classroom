import generateTemplate from "../templates";
import notFountImage from "../../assets/images/not_found.png";

export default class VideoStorageView {
  constructor() {
    this.savedVideoSection = document.querySelector(".saved-video__section");
    this.savedVideoList = document.querySelector(".saved-video-list");
  }

  renderEmptyStorage = () => {
    const message =
      "저장된 영상이 없습니다<br />나만의 영상을 검색하여 저장해보세요";

    this.savedVideoSection.removeChild(this.savedVideoList);
    this.savedVideoSection.classList.add("search-result--no-result");
    this.savedVideoSection.insertAdjacentHTML(
      "beforeend",
      generateTemplate.noResult(notFountImage, message)
    );
  };
}
