const validator = {
  isValidSearchInput: searchInput => {
    if (isEmptyInput(searchInput)) {
      throw new Error('입력된 글자가 없습니다. 한 글자 이상의 검색어를 입력해주세요.');
    }
  },
};

function isEmptyInput(searchInput) {
  return searchInput.trim() === '';
}

export default validator;
