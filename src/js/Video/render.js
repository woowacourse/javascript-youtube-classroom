import { CLASSNAME } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $ } from "../utils/DOM.js";

const DOMAIN = "https://www.youtube.com";

const renderVideo = ($video, item) => {
  const {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishedAt },
  } = item;

  const $iframe = $video.querySelector(`.${CLASSNAME.VIDEO_ID}`);
  const $videoTitle = $video.querySelector(`.${CLASSNAME.VIDEO_TITLE}`);
  const $channelTitle = $video.querySelector(`.${CLASSNAME.CHANNEL_TITLE}`);
  const $publishedAt = $video.querySelector(`.${CLASSNAME.PUBLISHED_AT}`);

  $iframe.src = `${DOMAIN}/embed/${videoId}`;

  $videoTitle.innerText = title;

  $channelTitle.href = `${DOMAIN}/channel/${channelId}`;
  $channelTitle.innerText = channelTitle;

  $publishedAt.innerText = new Date(publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  $.removeClass($video, CLASSNAME.SKELETON);
};

const renderMainVideo = ($video, item) => {
  renderVideo($video, item);

  const { videoId } = item.id;

  const $iconsWrapper = $video.querySelector(`.${CLASSNAME.ICONS_WRAPPER}`);

  $iconsWrapper.dataset.videoId = videoId;
};

const renderSearchVideo = ($video, item) => {
  renderVideo($video, item);

  const { videoId } = item.id;

  const $saveVideoButton = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON}`
  );
  const $saveVideoButtonWrapper = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}`
  );

  $saveVideoButton.dataset.videoId = videoId;

  $.show($saveVideoButtonWrapper);

  messenger.deliverMessage(MESSAGE.HIDE_IF_VIDEO_IS_SAVED, {
    videoId,
    callback: () => {
      $.addClass($saveVideoButton, CLASSNAME.CANCEL);
      $saveVideoButton.innerText = "취소";
    },
  });

  $saveVideoButtonWrapper.classList.remove(CLASSNAME.HIDDEN);

  $video.classList.remove(CLASSNAME.SKELETON);
};

export { renderMainVideo, renderSearchVideo };
