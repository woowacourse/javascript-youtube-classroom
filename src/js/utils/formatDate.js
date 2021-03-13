export const formatDateKR = (string) => {
  const date = new Date(string);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return date.toLocaleDateString('ko-KR', options);
};
