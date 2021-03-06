import { CLASSNAME } from "../constants.js";
import { URL } from "../utils/URL.js";
import { $ } from "../querySelector.js";
import dummyFetch from "../dummyFetch.js";
import store from "../store.js";

const TEMPLATE = ({ videoId, title, channelId, channelTitle, publishedAt }) => `
<article class="clip">
<div class="preview-container">
  <iframe
    width="100%"
    height="118"
    src="https://www.youtube.com/embed/${videoId}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<div class="content-container pt-2 px-1">
  <h3>${title}</h3>
  <div>
    <a
      href="https://www.youtube.com/channel/${channelId}"
      target="_blank"
      class="channel-name mt-1"
    >
      ${channelTitle}
    </a>
    <div class="meta">
      <p>${new Date(publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</p>
    </div>
    <div class="d-flex justify-end">
      <button class="btn">⬇️ 저장</button>
    </div>
  </div>
</div>
</article>`;

export default class VideoWrapper {
  constructor() {
    this.$modalVideoWrapper = $(CLASSNAME.MODAL_VIDEO_WRAPPER);
    this.$notFoundImg = $(CLASSNAME.NOT_FOUND_IMAGE);
    this.query = "";
    this.nextPageToken = "";

    store.addStateListener("items", (items) => {
      if (items.length === 0) {
        this.$notFoundImg.classList.remove(CLASSNAME.HIDDEN);
        this.$modalVideoWrapper.innerHTML = "";
        return;
      }

      const clipInfos = items.map(
        ({
          id: { videoId },
          snippet: { title, channelId, channelTitle, publishedAt },
        }) => ({
          videoId,
          title,
          channelId,
          channelTitle,
          publishedAt,
        })
      );

      store.addStateListener("query", (query) => {
        if (query !== this.query) {
          this.$modalVideoWrapper.innerHTML = "";
        }
        this.query = query;
      });

      store.addStateListener("nextPageToken", (nextPageToken) => {
        this.nextPageToken = nextPageToken;
      });

      clipInfos.forEach((clipInfo) => {
        this.$modalVideoWrapper.insertAdjacentHTML(
          "beforeEnd",
          TEMPLATE(clipInfo)
        );
      });
      this.$notFoundImg.classList.add(CLASSNAME.HIDDEN);
    });

    this.throttle = null;
    this.$modalVideoWrapper.addEventListener(
      "scroll",
      this.handlePageScroll.bind(this)
    );
  }

  handlePageScroll() {
    if (
      this.$modalVideoWrapper.scrollTop +
        this.$modalVideoWrapper.clientHeight <=
      this.$modalVideoWrapper.scrollHeight * 0.7
    ) {
      return;
    }

    if (this.throttle) {
      return;
    }

    this.throttle = setTimeout(async () => {
      this.throttle = null;

      try {
        // const response = await dummyFetch(
        //   this.currentQuery,
        //   this.currentNextPageToken
        // );

        const response = await fetch(URL(this.query, this.nextPageToken));

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { nextPageToken, items } = await response.json();

        store.setState({ nextPageToken, items });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }, 500);
  }
}
