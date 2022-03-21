import { createUrl } from '../utils/util';

const generateFetcher =
  (API_URL) =>
  async ({ path, params }) => {
    const url = createUrl(API_URL, path, params);
    const response = await fetch(url, { method: 'GET' });
    /** 빠른 실패 */
    if (!response.ok) {
      throw new Error(`api 요청 중 에러 발생: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

export const youtubeAPIFetcher = generateFetcher('https://jolly-agnesi-fe3944.netlify.app');
