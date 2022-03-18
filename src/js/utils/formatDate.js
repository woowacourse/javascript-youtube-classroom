export const formatDate = date => {
  const newDate = new Date(date);

  return (
    newDate.getFullYear() + '년 ' + (newDate.getMonth() + 1) + '월 ' + newDate.getDate() + '일 '
  );
};
