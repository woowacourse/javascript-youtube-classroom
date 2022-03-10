const convertToKoreaLocaleDate = date => {
  return new Date(date).toLocaleString('ko-KR');
};

export { convertToKoreaLocaleDate };
