export const isEmpty = (value) => value === '';

export const convertYYYYMMDD = (publishTime) => {
  const videoTime = new Date(publishTime.slice(0, 10));
  return `${videoTime.getFullYear().toString()}년 ${(videoTime.getMonth() + 1)
    .toString()
    .padStart(2, '0')}월 ${videoTime.getDate().toString().padStart(2, '0')}일`;
};
