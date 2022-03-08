const validator = {
  isEmptyInput: (value) => value === "",
};

export const checkValidSearchInput = (value) => {
  if (validator.isEmptyInput(value)) {
    throw new Error("검색어를 입력해주세요");
  }
};
