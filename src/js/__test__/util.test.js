import { convertToKoreaLocaleDate } from '../utils/common';

it('날짜가 한국 표준시로 변환된다.', () => {
  const prevDate = '2020-10-23T16:49:44Z';
  const convertedDate = convertToKoreaLocaleDate(prevDate);
  expect(convertedDate).toEqual('2020. 10. 24. 오전 1:49:44');
});
