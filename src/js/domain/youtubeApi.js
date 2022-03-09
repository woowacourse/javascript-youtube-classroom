import 'regenerator-runtime';
import { ERROR_MESSAGE } from '../constants';

const request = async (searchText, key) => {
  // const response = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&key=${key}&maxResults=10&type=video`,
  // );
  const response = await fetch(
    'https://767e20cd-5f64-4f0b-bdbd-68832116e901.mock.pstmn.io/testapi/first',
  );
  // const response = await fetch(
  //   'https://3d7af3eb-c994-4636-8bdc-8ae30b4fa39d.mock.pstmn.io',
  // );
  if (response.status === 200) {
    const searchResult = await response.json();
    return searchResult;
  } else {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }
};

export { request };
