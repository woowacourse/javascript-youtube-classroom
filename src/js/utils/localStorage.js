const LOCALSTORAGE_KEY = 'VIDEO_IDS';

const getStorageVideoIDs = (key) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideoIDs = ({ key, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageVideoIDs, setStorageVideoIDs, LOCALSTORAGE_KEY };
