/* eslint-disable no-undef */
import { LIMIT_VIDEO_COUNTS } from '../js/constants/constants.js';
import storage from '../js/storage/storage.js';

describe('로컬 스토리지에 정보가 올바르게 저장되는지 테스트', () => {
  test('비디오 아이디 값이 로컬 스토리지에 올바르게 저장되는지 확인한다', () => {
    const videoId = 'mQhgF7RoUCA';
    storage.saveVideo(videoId);
    const savedStorage = storage.getLocalStorage();
    expect(savedStorage[0].id === videoId).toBe(true);
  });
  test('이미 중복된 비디오 아이디 값이 있을 경우 로컬 스토리지에 저장하지 않는다', () => {
    const videoId = 'mQhgF7RoUCA';
    storage.saveVideo(videoId);
    storage.saveVideo(videoId);
    const savedStorage = storage.getLocalStorage();
    expect(savedStorage.length === 1).toBe(true);
  });
  test('localStorage에 저장된 값이 100개가 넘었을 경우 로컬 스토리지에 더 이상 저장하지 않는다', () => {
    const videoId = 'mQhgF7RoUCA';
    const hundredMockId = new Array(LIMIT_VIDEO_COUNTS).fill('id');
    hundredMockId.forEach((id, index) => {
      storage.saveVideo(index);
    });
    storage.saveVideo(videoId);
    const savedStorage = storage.getLocalStorage();
    expect(savedStorage.length === LIMIT_VIDEO_COUNTS).toBe(true);
  });
});
