import { API_URL } from '../constants/fetcher';

const generateQueryString = (params) =>
  Object.entries(params).reduce(
    (prev, [key, value]) => (value ? `${prev}&${key}=${value}` : prev),
    ''
  );

export const youtubeAPIFetcher = async ({ path, params }) => {
  const response = await fetch(
    `${API_URL}${path}?key=${API_KEY}${generateQueryString(params)}`,
    {}
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`api 요청 중 에러 발생: ${response.status}`);
};
