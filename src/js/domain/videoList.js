import { ERROR_MESSAGES, VIDEO_LIST_URL_BASE } from '../constants/constants';
import getVideoObjectArray from './utils/getVideoObjectArray';

function generateQueryString(idArray) {
  const query = new URLSearchParams({
    part: 'snippet',
  });
  idArray.forEach((id) => {
    query.append('id', id);
  });
  return query;
}

export default async function getVideoList(idArray) {
  const queryString = generateQueryString(idArray);
  try {
    const response = await fetch(`${VIDEO_LIST_URL_BASE}${queryString}`);
    if (!response.ok) throw new Error();
    const { items } = await response.json();

    return getVideoObjectArray(items);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
}
