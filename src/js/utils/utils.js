export const isDuplicate = (inputData, storeData) => {
  return storeData.some((store) => store.id === inputData.id);
};
