/**
 * @jest-environment jsdom
 */
import Storage from '../../src/js/Storage';
import SearchVideoManager from '../../src/js/Manager/SearchVideoManager';
 
describe('검색 결과 관련 기능 테스트', () => {
  let storage;
  let searchVideoManager;
 
  beforeEach(() => {
    jest.clearAllMocks();
    storage = new Storage();
    searchVideoManager = new SearchVideoManager({ storage });
  });
 
  it('fetch 결과를 가공한 데이터에는, 검색 결과 제공에 필요한 비디오 정보가 모두 있다.', () => {
    const keys = ['id', 'thumbnail', 'title', 'channelName', 'publishedDate', 'saved'];
    const videoItems = searchVideoManager.processFetchedResult(dummy);

    videoItems.forEach((item) => {
      expect(keys.some((key) => item[key] === undefined)).toBeFalsy();
    })
  });
});
 
const dummy = 
{
  "kind": "youtube#searchListResponse",
  "etag": "10U5CgkaA_f1V50Oyx06GCGqGik",
  "nextPageToken": "CAUQAA",
  "regionCode": "US",
  "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "eBuzYNmUZuQ-q5AcCD6cVo97cJg",
      "id": {
        "kind": "youtube#video",
        "videoId": "zSGOF-dnImk"
      },
      "snippet": {
        "publishedAt": "2022-03-06T12:45:25Z",
        "channelId": "UCVut4hqvrjQC4qDE3oc5qig",
        "title": "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 기다리던 봄이 오고 있어",
        "description": "사진 사용을 허락해주신 현빈 작가님 감사드립니다. 신현빈 : HYUNBIN SHIN @chalkak.film https://www.instagram.com/chalkak.film/ ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/zSGOF-dnImk/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/zSGOF-dnImk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/zSGOF-dnImk/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "때껄룩ᴛᴀᴋᴇ ᴀ ʟᴏᴏᴋ",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-06T12:45:25Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "j7phlRQO_f7hJX6eGEx2gM_k2AQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "L0Mz89XUYFU"
      },
      "snippet": {
        "publishedAt": "2022-03-11T05:00:15Z",
        "channelId": "UCyMlpFLkx6y5Fg5T19OHudA",
        "title": "너와 자주 갔던 골목길 카페에서 듣던 감성 힙합 &amp; 알앤비 노래 모음ㅣPLAYLISTㅣ플레이리스트 광고없음",
        "description": "감성힙합 #감성알앤비 #플레이리스트 해당 콘텐츠 일부는 제작비 지원을 받아 제작했습니다.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/L0Mz89XUYFU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/L0Mz89XUYFU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/L0Mz89XUYFU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "레몬쓰",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-11T05:00:15Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "_-LVTTqrZ-FCrxX1WzZcVBoMiwU",
      "id": {
        "kind": "youtube#video",
        "videoId": "jVKrIEyeHVo"
      },
      "snippet": {
        "publishedAt": "2022-03-12T00:02:39Z",
        "channelId": "UCxGyH7vzYkZwFseTUa3yZpQ",
        "title": "🌼 나른나른한 요즘 날씨에 틀어놓기 좋은 노래 모음 | PLAYLIST",
        "description": "나른나른한 요즘 날씨에 틀어놓기 좋은 플레이리스트 영상이 마음에 드셨다면 [ 구독 ] [ 좋아요 ] [ 알림 ] ◾ 영상 속 광고는 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/jVKrIEyeHVo/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/jVKrIEyeHVo/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/jVKrIEyeHVo/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "찐막 JJINMAK",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-12T00:02:39Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "MEIR24KxMPUR4H64N7KgatiYr-c",
      "id": {
        "kind": "youtube#video",
        "videoId": "CuHWrFH1T7c"
      },
      "snippet": {
        "publishedAt": "2022-03-12T00:46:42Z",
        "channelId": "UCfUGIcsUpU-QTye5B6CN3rw",
        "title": "BTS RAIN PLAYLIST 🌨 빗속의 방탄 쿨 플레이리스트 🌨 BTS Chill Playlist In The Rain",
        "description": "BTS RAIN PLAYLIST 빗속의 방탄 쿨 플레이리스트 BTS Chill Playlist In The Rain BTS RAIN PLAYLIST 빗속의 방탄 쿨 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/CuHWrFH1T7c/default_live.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/CuHWrFH1T7c/mqdefault_live.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/CuHWrFH1T7c/hqdefault_live.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Kpop Star",
        "liveBroadcastContent": "live",
        "publishTime": "2022-03-12T00:46:42Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "pw0wsp1dPDRVn2TObLXW8z6dSlE",
      "id": {
        "kind": "youtube#video",
        "videoId": "GG-JEoqDCGU"
      },
      "snippet": {
        "publishedAt": "2022-03-11T10:00:00Z",
        "channelId": "UCid83oPnsL-4ZEo8CyQr6Rg",
        "title": "거절한 남자한테 반해버렸다 [플렌즈] 서연대 22학번 편 – EP.02",
        "description": "6:50 갑자기 장르 스릴러...   10:25 심장이 뛰는 걸 보니 저는 이 주식 밉니다 12:16 뭔데뭔데 과거 서사 뭔데   #해찬 #좋은사람 #NCT ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/GG-JEoqDCGU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/GG-JEoqDCGU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/GG-JEoqDCGU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "PLAYLIST ORIGINALS 플레이리스트 오리지널",
        "liveBroadcastContent": "none",
        "publishTime": "2022-03-11T10:00:00Z"
      }
    }
  ]
};
