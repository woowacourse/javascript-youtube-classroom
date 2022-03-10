const isEmpty = (value) => value === '';

test('빈 값을 입력하면 검색이 불가능하다.', () => {
  const keyword = '';

  expect(isEmpty(keyword)).toBe(true);
});
