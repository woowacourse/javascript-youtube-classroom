import { getLocalStorage, setLocalStorage } from '../store/localStorage';
import { checkMaxStorageVolume } from '../util/validator.js';

const saveMachine = {
  saveToLocalStorage(key, newVideo) {
    checkMaxStorageVolume();
    const savedVideos = getLocalStorage(key);

    setLocalStorage(key, savedVideos.concat(newVideo));
  },
};

export default saveMachine;
