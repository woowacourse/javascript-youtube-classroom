it('검색 키워드는 2자 이상이어야 한다', () => {
  const wrongCaseInput = 'a';
  expect(validateSearchKeyword(wrongCaseInput)).toBe(false);
});
