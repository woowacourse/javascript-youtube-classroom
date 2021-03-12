import { CLASSNAME } from "../constants.js";

const TEMPLATE = `
<article class="clip ${CLASSNAME.SKELETON}">
  <div class="preview-container">
  <iframe
  class="image ${CLASSNAME.VIDEO_ID}"
  width="100%"
    height="118"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3 class="line ${CLASSNAME.VIDEO_TITLE}"></h3>
    <div>
      <a
        target="_blank"
        class="line channel-name mt-1 ${CLASSNAME.CHANNEL_TITLE}"
      >
      </a>
      <div class="line meta">
        <p class="${CLASSNAME.PUBLISHED_AT}">
        </p>
      </div>
      <div class="d-flex justify-end --hidden ${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}">
        <button class="btn ${CLASSNAME.SAVE_VIDEO_BUTTON}">⬇️ 저장</button> 
      </div>
    </div>
  </div>
</article>`;

export default TEMPLATE;
