import { YOUTUBE } from '../../utils/constant.js';

export const isEmptyDisplayClipCountFromCurrentTab = {
  [YOUTUBE.CURRENT_TAB.WATCHED]: (savedClips) =>
    Object.keys(savedClips).filter((id) => !savedClips[id].isWatched).length ===
    0,
  [YOUTUBE.CURRENT_TAB.UNWATCHED]: (savedClips) =>
    Object.keys(savedClips).filter((id) => savedClips[id].isWatched).length ===
    0,
  [YOUTUBE.CURRENT_TAB.LIKE_CLIP]: (savedClips) =>
    Object.keys(savedClips).filter((id) => savedClips[id].isLiked).length === 0,
};
