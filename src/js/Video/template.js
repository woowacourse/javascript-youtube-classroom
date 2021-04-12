import { CLASSNAME } from "../constants/index.js";

const GENERATE_TEMPLATE = (buttonTemplate) => `
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
      ${buttonTemplate}
    </div>
  </div>
</article>`;

const SAVED_VIDEO_BUTTON_TEMPLATE = `
<div class="d-flex justify-end ${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}">
  <button class="btn ${CLASSNAME.SAVE_VIDEO_BUTTON}">저장</button> 
</div>
`;

// 추가 기능 구현용
// <span class="opacity-hover ${CLASSNAME.COMMENT_ICON}">💬</span>

const WATCH_LATER_ICON_BUTTONS_TEMPLATE = `
<div class=${CLASSNAME.ICONS_WRAPPER}>
  <span class="opacity-hover icon watched-icon ${CLASSNAME.WATCHED_ICON}"></span>
  <span class="opacity-hover ${CLASSNAME.LIKE_ICON}">👍</span>
  <span class="opacity-hover ${CLASSNAME.DELETE_ICON}">🗑️</span>
</div>`;

const HISTORY_ICON_BUTTONS_TEMPLATE = `
<div class=${CLASSNAME.ICONS_WRAPPER}>
  <span class="opacity-hover icon watch-later-icon ${CLASSNAME.WATCH_LATER_ICON}"></span>
  <span class="opacity-hover ${CLASSNAME.LIKE_ICON}">👍</span>
  <span class="opacity-hover ${CLASSNAME.DELETE_ICON}">🗑️</span>
</div>`;

const LIKE_ICON_BUTTONS_TEMPLATE = `
<div class=${CLASSNAME.ICONS_WRAPPER}>
  <span class="opacity-hover like ${CLASSNAME.LIKE_ICON}">👍</span>
</div>`;

const WATCH_LATER_VIDEO_TEMPLATE = GENERATE_TEMPLATE(
  WATCH_LATER_ICON_BUTTONS_TEMPLATE
);
const HISTORY_VIDEO_TEMPLATE = GENERATE_TEMPLATE(HISTORY_ICON_BUTTONS_TEMPLATE);
const LIKE_VIDEO_TEMPLATE = GENERATE_TEMPLATE(LIKE_ICON_BUTTONS_TEMPLATE);
const SEARCH_VIDEO_TEMPLATE = GENERATE_TEMPLATE(SAVED_VIDEO_BUTTON_TEMPLATE);

export {
  WATCH_LATER_VIDEO_TEMPLATE,
  HISTORY_VIDEO_TEMPLATE,
  LIKE_VIDEO_TEMPLATE,
  SEARCH_VIDEO_TEMPLATE,
};
