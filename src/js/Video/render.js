import { CLASSNAME, MESSAGE } from "../constants.js";
import messenger from "../Messenger.js";

const render = ($video, item) => {
  const {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishedAt },
  } = item;

  const $iframe = $video.querySelector(`.${CLASSNAME.VIDEO_ID}`);
  const $videoTitle = $video.querySelector(`.${CLASSNAME.VIDEO_TITLE}`);
  const $channelTitle = $video.querySelector(`.${CLASSNAME.CHANNEL_TITLE}`);
  const $publishedAt = $video.querySelector(`.${CLASSNAME.PUBLISHED_AT}`);
  const $saveVideoButton = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON}`
  );
  const $saveVideoButtonWrapper = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}`
  );

  $iframe.src = `https://www.youtube.com/embed/${videoId}`;

  $videoTitle.innerText = title;

  $channelTitle.href = `https://www.youtube.com/channel/${channelId}`;
  $channelTitle.innerText = channelTitle;

  $publishedAt.innerText = new Date(publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  $saveVideoButton.dataset.videoId = videoId;

  messenger.deliverMessage(MESSAGE.HIDE_IF_VIDEO_IS_SAVED, {
    videoId,
    callback: () => $saveVideoButton.classList.add(CLASSNAME.HIDDEN),
  });

  $saveVideoButtonWrapper.classList.remove(CLASSNAME.HIDDEN);

  $video.classList.remove(CLASSNAME.SKELETON);
};

export default render;
