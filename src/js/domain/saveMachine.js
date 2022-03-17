import { LOCALSTORAGE_KEY_SAVE } from '../constant/index.js';
import { getLocalStorage, setLocalStorage } from './localStorage.js';
import { checkMaxStorageVolume } from '../util/validator.js';

const saveMachine = {
  saveVideoToLocalStorage(newVideo) {
    checkMaxStorageVolume();
    const savedVideos = getLocalStorage(LOCALSTORAGE_KEY_SAVE);

    setLocalStorage(LOCALSTORAGE_KEY_SAVE, savedVideos.concat(newVideo));
  },
};

export default saveMachine;
