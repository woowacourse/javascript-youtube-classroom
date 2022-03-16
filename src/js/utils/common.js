const convertToKoreaLocaleDate = date => {
  return new Date(date).toLocaleString('ko-KR');
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export { convertToKoreaLocaleDate, delay };
