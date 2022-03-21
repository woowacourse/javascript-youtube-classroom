import ApiUtil from './ApiUtil.js';

test('endPoint와 params로 requestURL을 만들 수 있다.', () => {
  const endPoint = 'https://vigorous-boyd-74648a.netlify.app/youtube/v3/search';
  const params = {
    q: 'woowa',
    type: 'video',
  };

  expect(ApiUtil.createQueryString(endPoint, params)).toEqual(
    `https://vigorous-boyd-74648a.netlify.app/youtube/v3/search?q=woowa&type=video`
  );
});
