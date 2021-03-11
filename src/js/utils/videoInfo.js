import { CLASSNAME, MESSAGE } from "../constants.js";
import messenger from "../Messenger.js";

export const SKELETON_TEMPLATE = `
<article class="clip skeleton">
<div class="preview-container">
<iframe
class="image js-video-id"
width="100%"
  height="118"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
</div>
<div class="content-container pt-2 px-1">
  <h3 class="line js-video-title"></h3>
  <div>
    <a
      target="_blank"
      class="line channel-name mt-1 js-channel-title"
    >
    </a>
    <div class="line meta">
      <p class="js-published-at">
      </p>
    </div>
    <div class="d-flex justify-end --hidden js-save-video-button-wrapper">
      <button class="btn js-save-video-button">⬇️ 저장</button> 
    </div>
  </div>
</div>
</article>`;

const createVideoInfo = (item) => {
  const {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishedAt },
  } = item;

  return {
    videoId,
    title,
    channelId,
    channelTitle,
    publishedAt,
  };
};

const removeSkeletonUI = ($video) => {
  const $saveVideoButtonWrapper = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}`
  );

  $saveVideoButtonWrapper.classList.remove(CLASSNAME.HIDDEN);

  $video.classList.remove(CLASSNAME.SKELETON);
};

export const render = ($video, item) => {
  const {
    videoId,
    title,
    channelId,
    channelTitle,
    publishedAt,
  } = createVideoInfo(item);

  const $iframe = $video.querySelector(`.${CLASSNAME.VIDEO_ID}`);
  const $videoTitle = $video.querySelector(`.${CLASSNAME.VIDEO_TITLE}`);
  const $channelTitle = $video.querySelector(`.${CLASSNAME.CHANNEL_TITLE}`);
  const $publishedAt = $video.querySelector(`.${CLASSNAME.PUBLISHED_AT}`);
  const $saveVideoButton = $video.querySelector(
    `.${CLASSNAME.SAVE_VIDEO_BUTTON}`
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

  removeSkeletonUI($video);
};
