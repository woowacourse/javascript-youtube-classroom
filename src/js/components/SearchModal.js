import { $ } from "../utils/dom.js";
import { API_KEY } from "../apiKey.js";

class SearchModal {
  constructor() {
    this.initState();
    this.selectDOM();
    this.bindEvent();
    this.initObserver();
  }

  initState() {
    this.keyword = "";
    this.videos = [];
    this.nextPageToken = "";
  }

  setState({ keyword, videos, nextPageToken }) {
    this.keyword = keyword ?? this.keyword;
    this.videos = videos ?? this.videos;
    this.nextPageToken = nextPageToken ?? this.nextPageToken;

    this.render();
  }

  selectDOM() {
    this.$target = $(".search-modal");
    this.$searchInput = $(".search-modal__input");
    this.$videoWrapper = $(".search-modal__video-wrapper");
    this.$scrollArea = $(".search-modal__scroll-area");
    this.$moreArea = $(".search-modal__more-area");
  }

  bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this.handleSearchKeyword();
    });
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          this.handleLoadMore();
        }
      },
      { root: this.$scrollArea },
    );

    this.observer.observe(this.$moreArea);
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

    const { items, nextPageToken } = await res.json();

    const videos = items.map(
      ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
        videoId,
        channelId,
        channelTitle,
        publishedAt,
        title,
      }),
    );

    this.setState({ keyword, videos, nextPageToken });
  }

  async handleLoadMore() {
    if (!this.$target.classList.contains("open")) {
      return;
    }

    const res = await fetch(
      `https://content.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(
        this.keyword,
      )}&maxResults=10&pageToken=${this.nextPageToken}&key=${API_KEY}`,
    );

    if (!res.ok) {
      return;
    }

    const { items, nextPageToken } = await res.json();

    const nextVideos = items.map(
      ({ id: { videoId }, snippet: { channelId, channelTitle, publishedAt, title } }) => ({
        videoId,
        channelId,
        channelTitle,
        publishedAt,
        title,
      }),
    );

    this.setState({ videos: [...this.videos, ...nextVideos], nextPageToken });
  }

  render() {
    this.videos.length
      ? (this.$videoWrapper.innerHTML = this.videos
          .map(video => createSearchedVideoTemplate(video))
          .join(""))
      : (this.$videoWrapper.innerHTML = createNoSearchResultTemplate());
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

const createNoSearchResultTemplate = () =>
  `<div class='no-search-result'><img class='no-result-image' src='src/images/status/not_found.png' alt='결과 없음'><p>검색 결과가 존재하지 않습니다.</p></div>`;

const changeDateFormat = publishedAt => {
  const date = new Date(publishedAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}년 ${month}월 ${day}일`;
};

export default SearchModal;
