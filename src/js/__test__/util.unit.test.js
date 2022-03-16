import { preprocessDate } from '../util/common.js';

test('년, 월, 일 형식으로 날짜를 가져올 수 있다.', () => {
  const date = '2021-05-29T10:00:14Z';

  expect(preprocessDate(date)).toBe('2021년 05월 29일');
});
