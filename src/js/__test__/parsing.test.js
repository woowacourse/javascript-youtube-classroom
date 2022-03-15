import { parserVideos, parseTimeStamp } from '../utils/util';
import YOUTUBE_SEARCH_DATA from './youtubeSearchResultData.json';

describe('데이터 파싱 테스트', () => {
  test('유튜브 검색 데이터을 nextPageToken과 items로 변활할 수 있다.', () => {
    const parsedYoutubeSearchData = parserVideos(YOUTUBE_SEARCH_DATA);

    const expectedNextToken = 'CAoQAA';
    const expectedItems = [
      {
        videoId: 'LsOPJhe8pjY',
        thumbnail: 'https://i.ytimg.com/vi/LsOPJhe8pjY/default.jpg',
        publishTime: '2022-03-05T05:00:06Z',
        channelTitle: '퀴즈코리아',
        videoTitle: '성격테스트 - 가장 어려운 밸런스 게임으로 알아보는 당신의 성격 유형',
      },
    ];

    expect(parsedYoutubeSearchData).toHaveProperty('nextPageToken', expectedNextToken);
    expect(parsedYoutubeSearchData).toHaveProperty('items', expectedItems);
  });
  test('비디오 게시일 데이터를 OOOO년 OO월 OO일 형식으로 변환할 수 있다.', () => {
    const videoPublishTime = '2021-09-14T09:00:11Z';

    const parsedVideoPublishTime = '2021년 9월 14일';

    expect(parseTimeStamp(videoPublishTime)).toEqual(parsedVideoPublishTime);
  });
});
