export const changeDateFormat = date => {
  if (Date.parse(date)) {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "";
};
