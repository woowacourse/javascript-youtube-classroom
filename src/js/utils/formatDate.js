export const formatDateKR = (string) => {
  const date = new Date(string);

  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};
