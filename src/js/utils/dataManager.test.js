import { uriBuilder, getParsedTime } from './dataManager';

test('시스템 시간을 YYYY년 MM월 DD일의 형태로 반환한다.', () => {
  const timeString = '2020-11-27T08:13:35Z';
  const parsedTime = '2020년 11월 27일';
  expect(getParsedTime(timeString)).toBe(parsedTime);
});

test('파라미터값을 받아서 올바른 uri을 생성한다.', () => {
  const baseUri = 'http://google.com';
  const params = {
    q: 'keyword',
    maxResult: 5,
  };
  const uri = `${baseUri}?q=keyword&maxResult=5`;
  expect(uriBuilder(baseUri, params)).toBe(uri);
});
