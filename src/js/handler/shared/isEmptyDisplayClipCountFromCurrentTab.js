export const isEmptyDisplayClipCountFromCurrentTab = {
  '볼 영상': (savedClips) =>
    Object.keys(savedClips).filter((id) => !savedClips[id].isWatched).length ===
    0,
  '본 영상': (savedClips) =>
    Object.keys(savedClips).filter((id) => savedClips[id].isWatched).length ===
    0,
  '좋아하는 영상': (savedClips) =>
    Object.keys(savedClips).filter((id) => savedClips[id].isLiked).length === 0,
};
