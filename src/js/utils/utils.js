export const isDuplicate = (inputData, storeData) => {
  return storeData.some((store) => store.id === inputData.id);
};

export const parsedDate = (rawDate) => {
  const date = rawDate.split("T")[0];
  const standard = ["년", "월", "일"];

  return date
    .split("-")
    .map((item, index) => Number(item) + standard[index])
    .join(" ")
    .trim();
};
