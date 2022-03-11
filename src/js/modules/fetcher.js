import { createURL } from '../utils/util';

export const youtubeAPIFetcher = async ({ path, params }) => {
  /** url 만드는 함수로 ? */

  const url = createURL(path, params);

  const response = await fetch(url, { method: 'GET' });
  /** 빠른 실패 */
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`api 요청 중 에러 발생: ${response.status}`);
};
