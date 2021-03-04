import { $ } from "../utils/dom.js";
import { API_KEY } from "../apiKey.js";

class SearchModal {
  constructor() {
    this.initState();
    this.selectDOM();
    this.bindEvent();
  }

  initState() {
    this.videos = [];
  }

  setState({ videos }) {
    this.videos = videos ?? this.videos;

    this.render();
  }

  selectDOM() {
    this.$target = $(".search-modal");
    this.$searchInput = $(".search-modal__input");
    this.$videoWrapper = $(".search-modal__video-wrapper");
  }

  bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this.handleSearchKeyword();
    });
  }

  showLoadingAnimation() {
    const skeletonCardTemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`;

    this.$videoWrapper.insertAdjacentHTML("beforeend", skeletonCardTemplate.repeat(10));
  }

  async handleSearchKeyword() {
    const keyword = this.$searchInput.value.trim();

    if (keyword.length === 0) {
      alert("검색어를 입력해주세요");
      return;
    }

    this.showLoadingAnimation();

    const res = await fetch(
      `https://content.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(
        keyword,
      )}&maxResults=10&key=${API_KEY}`,
    );

    if (!res.ok) {
      return;
    }

    const { items } = await res.json();

    const videos = items.map(
      ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
        videoId,
        channelId,
        channelTitle,
        publishedAt,
        title,
      }),
    );

    this.setState({ videos });
  }

  render() {
    this.$videoWrapper.innerHTML = this.videos
      .map(video => createSearchedVideoTemplate(video))
      .join("");
  }

  showModal() {
    this.$target.classList.add("open");
  }
}

const createSearchedVideoTemplate = video => `
<article class="clip">
  <div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube.com/embed/${video.videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${video.title}</h3> //title
    <div>
      <a
        href="https://www.youtube.com/channel/${video.channelId}"
        target="_blank"
        class="channel-name mt-1"
      >
      ${video.channelTitle}
      </a>
      <div class="meta">
        <p>${changeDateFormat(video.publishedAt)}</p>
      </div>
      <div class="d-flex justify-end">
        <button class="btn">⬇️ 저장</button>
      </div>
    </div>
  </div>
</article>`;

const changeDateFormat = publishedAt => {
  const date = new Date(publishedAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}년 ${month}월 ${day}일`;
};

export default SearchModal;
