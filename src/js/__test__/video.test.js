/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/**
 * 테스트 코드에 한하여 max-lines-per-function 규칙과 no-undef 규칙을 비활성화 했습니다.
 */

import Video from '../modules/video';
import { VIDEO_PROPERTIES } from '../constants/video';
import { hasMissingProperty, isNullVideoList, isFirstSearchByKeyword } from '../utils/validation';

describe('비디오 모듈 테스트', () => {
  test('비디오 생성할 수 있다.', () => {
    const givenVideoInput = {
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '승리자 빅터',
      publishTime: '12:30',
      thumbnail: '1.jpg',
      isWatched: true,
    };
    const video = new Video(givenVideoInput);

    const videoInfo = video.getVideoInfo();
    expect(videoInfo).toEqual(givenVideoInput);
  });

  test('누락된 데이터가 있다면, 비디오 생성할 수 없다.', () => {
    const givenVideoInput = {
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      publishTime: '12:30',
      thumbnail: '1.jpg',
    };

    try {
      Video.create(givenVideoInput);
      expect(true).toBe(false);
    } catch ({ message }) {
      expect(message).toBe('누락된 데이터가 있습니다.');
    }
  });

  test('주어진 비디오 정보에 누락된 property가 있다면, false를 반환해야한다.', () => {
    const givenVideoInfo = {
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      publishTime: '12:30',
      thumbnail: '1.jpg',
    };

    expect(hasMissingProperty(VIDEO_PROPERTIES, givenVideoInfo)).toBeTruthy();
  });
});

describe('비디오 렌더링 관련 테스트', () => {
  test('검색된 비디오가 없다면 false를 반환해야 한다.', () => {
    const videoList = null;

    expect(isNullVideoList(videoList)).toBeTruthy();
  });

  test('검색된 비디오가 있다면 true를 반환해야 한다.', () => {
    const givenVideoInput = {
      videoId: '1',
      videoTitle: '빅터의 브이로그',
      channelTitle: '승리자 빅터',
      publishTime: '12:30',
      thumbnail: '1.jpg',
    };
    const video = new Video(givenVideoInput);

    const videoList = [video];

    expect(isNullVideoList(videoList)).toBeFalsy();
  });

  test('검색된 비디오 데이터가 초깃값(빈 배열)이라면 true를 반환해야 한다.', () => {
    const videoList = [];

    expect(isNullVideoList(videoList)).toBeFalsy();
  });

  test('검색어를 검색하고 처음 비디오를 렌더링하는 것이라면 true를 반환해야 한다.', () => {
    const previousVideoListLength = 0;

    expect(isFirstSearchByKeyword(previousVideoListLength)).toBeTruthy();
  });

  test('검색어를 검색하고 스크롤을 내려 추가로 비디옹를 렌더링하는 것이라면 false를 반환해야 한다.', () => {
    const previousVideoListLength = 10;

    expect(isFirstSearchByKeyword(previousVideoListLength)).toBeFalsy();
  });
});
