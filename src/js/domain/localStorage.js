export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) ?? [];

export const setWatchedToStorage = (id) => {
  const item = getLocalStorage('watched').concat(id);
  localStorage.setItem('watched', JSON.stringify(item));
};

export const toggleWatchedToStorage = (id) => {
  const items = getLocalStorage('watched');
  if (items.includes(id)) {
    localStorage.setItem(
      'watched',
      JSON.stringify(items.filter((item) => item !== id)),
    );
    return;
  }
  if (!items.includes(id)) {
    setWatchedToStorage(id);
  }
};
