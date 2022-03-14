import APIManager from './APIManager.js';
import videoAPICaller from './videoAPICaller.js';

test('endPoint와 params로 requestURL을 만들 수 있다.', () => {
  const endPoint = videoAPICaller.endPoint;
  const params = {
    q: 'woowa',
    type: 'video',
  };

  expect(APIManager.createQueryString(endPoint, params)).toEqual(
    `${videoAPICaller.endPoint}?q=woowa&type=video`
  );
});
