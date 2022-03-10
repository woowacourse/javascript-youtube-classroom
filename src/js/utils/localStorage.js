const getStorageVideoIDs = (key) =>
  JSON.parse(window.localStorage.getItem(key)) || [];

const setStorageVideoIDs = ({ key, value }) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const LOCALSTORAGE_KEY = 'VIDEO_IDS';

export { getStorageVideoIDs, setStorageVideoIDs, LOCALSTORAGE_KEY };
