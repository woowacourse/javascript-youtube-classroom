import { CLASSNAME, VIDEO_TYPE } from "../constants/index.js";

const GENERATE_TEMPLATE = (buttonTemplate) => `
<article class="clip ${CLASSNAME.SKELETON} ${VIDEO_TYPE.WATCH_LATER}">
  <div class="preview-container">
  <iframe
    class="image ${CLASSNAME.VIDEO_ID}"
    width="100%"
    height="118"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3 class="line ${CLASSNAME.VIDEO_TITLE}"></h3>
    <div>
      <a target="_blank" class="line channel-name mt-1 ${CLASSNAME.CHANNEL_TITLE}"></a>
      <div class="line meta">
        <p class="${CLASSNAME.PUBLISHED_AT}"></p>
      </div>
      ${buttonTemplate}
    </div>
  </div>
</article>`;

const SAVED_VIDEO_BUTTON_TEMPLATE = `
<div class="d-flex justify-end">
  <button class="btn ${CLASSNAME.SAVE_VIDEO_BUTTON}">저장</button>
  <button class="btn ${CLASSNAME.CANCEL_VIDEO_BUTTON}">취소</button>
</div>
`;

const MAIN_ICONS_TEMPLATE = `
<div class=${CLASSNAME.ICONS_WRAPPER}>
  <span class="${CLASSNAME.MOVE_TO_WATCH_LATER_ICON} icon move-to-watch-later-icon opacity-hover "></span>
  <span class="${CLASSNAME.MOVE_TO_HISTORY_ICON} icon move-to-history-icon opacity-hover"></span>
  <span class="${CLASSNAME.LIKE_ICON} icon opacity-hover">👍</span>
  <span class="${CLASSNAME.COMMENT_ICON} icon opacity-hover">💬</span>
  <span class="${CLASSNAME.DELETE_ICON} icon opacity-hover">🗑️</span>
</div>`;

const $mainVideoTemplateWrapper = document.createElement("div");
$mainVideoTemplateWrapper.innerHTML = GENERATE_TEMPLATE(MAIN_ICONS_TEMPLATE);
const $mainVideoTemplateElement = $mainVideoTemplateWrapper.firstElementChild;

export const getMainVideoTemplateElement = () =>
  $mainVideoTemplateElement.cloneNode(true);

const $searchVideoTemplateWrapper = document.createElement("div");
$searchVideoTemplateWrapper.innerHTML = GENERATE_TEMPLATE(
  SAVED_VIDEO_BUTTON_TEMPLATE
);
const $searchVideoTemplateElement =
  $searchVideoTemplateWrapper.firstElementChild;

export const getSearchVideoTemplateElement = () =>
  $searchVideoTemplateElement.cloneNode(true);
