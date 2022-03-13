import { NUM } from "./contants";

export const isDuplicatedId = (storage, id) => {
  return storage.includes(id);
};

export const isExceedStorage = (storage) => {
  return storage.length >= NUM.MAX_STORAGE_LENGTH;
};

export const verifySaveId = (storage, id) => {
  if (isDuplicatedId(storage, id)) {
    throw new Error("저장소에 이미 존재하는 데이터입니다!");
  }
  if (isExceedStorage(storage)) {
    throw new Error(`저장소 공간이 꽉찼습니다! (${storage.length}/${NUM.MAX_STORAGE_LENGTH})`);
  }
};
