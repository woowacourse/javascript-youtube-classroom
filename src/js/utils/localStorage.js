const LOCALSTORAGE_KEY = 'VIDEO_IDS';

const getStorageVideoIDs = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (error) {
    throw new Error('');
  }
};

const setStorageVideoIDs = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageVideoIDs, setStorageVideoIDs, LOCALSTORAGE_KEY };
