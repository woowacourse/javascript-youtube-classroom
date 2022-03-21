import { MAX_SAVE_VIDEO_COUNT } from '../constants/video';

export const hasMissingProperty = (properties, object) =>
  properties.some((key) => object[key] === undefined);

export const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

export const isNoneSearchResult = (searchResult) =>
  searchResult.items.filter((item) => item.snippet).length === 0;

export const isNullVideoList = (videoList) => videoList === null;

export const isFirstSearchByKeyword = (prevVideoListLength) => prevVideoListLength === 0;

export const isMoreThanMaxVideoCount = (videoList) => videoList.length >= MAX_SAVE_VIDEO_COUNT;

export const canLoadImage = (showingPX, showingCutline) => showingPX < showingCutline;

export const hasNotSrcAttribute = (imgElement) => !imgElement.src;

export const isCheckedVideo = (className) => className.includes('checked');

export const isLoadableImage = (top, showingCutline, target) =>
  canLoadImage(top, showingCutline) && hasNotSrcAttribute(target);
