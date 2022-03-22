import { LOCALSTORAGE_KEY_SEARCHED } from '../constant';
import { getLocalStorage, setLocalStorage } from '../store/localStorage';
import { checkMaxStorageVolume } from '../util/validator.js';

const saveMachine = {
  saveToLocalStorage(key, id) {
    checkMaxStorageVolume();
    const savedVideos = getLocalStorage(key);

    setLocalStorage(key, savedVideos.concat(id));
  },

  saveSearchedResult(key, videos) {
    const searchedVideos = getLocalStorage(key);
    const filteredVideos = searchedVideos.filter((searchedVideo) =>
      videos.every((video) => searchedVideo.id !== video.id),
    );

    const convertedVideos = videos.map(({ id, thumbnails, channelTitle, title, publishTime }) => {
      return { id, thumbnails, channelTitle, title, publishTime };
    });
    setLocalStorage(key, filteredVideos.concat(convertedVideos));
  },

  getItemsById(savedIds) {
    const searchedVideos = getLocalStorage(LOCALSTORAGE_KEY_SEARCHED);

    return searchedVideos.filter((searchedVideo) => savedIds.some((id) => id === searchedVideo.id));
  },
};

export default saveMachine;
