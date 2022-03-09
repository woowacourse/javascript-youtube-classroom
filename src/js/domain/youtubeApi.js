import 'regenerator-runtime';
import { ERROR_MESSAGE } from '../constants';

const request = async (searchText, key) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&key=${key}`,
  );
  if (response.status === 200) {
    const searchResult = await response.json();
    return searchResult;
  } else {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }
};

export { request };
