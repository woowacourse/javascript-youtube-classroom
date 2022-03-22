import { formatDate } from '../js/utils/index.js';

test('string으로 온 날짜값을 YYYY년 MM월 DD일 형식에 맞춰 출력할 수 있어야한다.', () => {
  const dateString = '2020-10-23T16:49:44Z';
  const expectString = '2020년 10월 23일';

  expect(formatDate(dateString)).toBe(expectString);
});
