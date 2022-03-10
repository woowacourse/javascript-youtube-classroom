// import getSearchResult from "../api/getSearchResult";
// 테스트 케이스 오류를 막기 위해 작성해놓은 코드 입니다.
test("", () => {});

/**
 * 실제 API를 호출하지 않고 Mock Data를 이용하여 테스트하는 케이스는 불필요하다고 생각되는데...
 * 리뷰어님 생각은 어떠신지 궁금하네용 😥
 * 실제 API 통신을 테스트 할 때는 어떻게 하는지 알 수 있을까요?
 */

// test("최초 검색 결과는 10개까지만 보여준다.", async () => {
//   fetch.mockResponseOnce(
//     JSON.stringify([
//       {
//         id: {
//           videoId: 1,
//         },
//         snippet: {
//           channelTitle: "essential;",
//           thumbnails: {
//             high: {
//               url: "https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ",
//             },
//           },
//           publishTime: "2022-03-02T11:39:31Z",
//           title: "[Playlist] 너무 좋은데 괜찮으시겠어요?",
//         },
//       },
//     ])
//   );
//   const result = await getSearchResult("xooos");
//   expect(result.length).toBe(1);
// });
