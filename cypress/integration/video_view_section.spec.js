/// <reference types="cypress" />
import { setDataToLocalStorage } from "../../src/js/utils/localStorage.js";
import { STORAGE } from "../../src/js/utils/constants.js";

context.only("저장된 비디오 관리", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
  });

  it("초기에 저장된 비디오가 존재하지 않는다면, 비어있다는 것을 사용자에게 알려주는 이미지를 보여준다.", () => {
    cy.get(".no-watch-later-image").should("be.visible");
  });

  it("초기에 저장된 비디오가 존재한다면, 비디오 리스트를 출력한다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, [
      {
        videoId: "JucV43KbvQk",
        channelId: "UC9NCnL0ZJmx33uL5GtkvsyQ",
        channelTitle: "닥터덕 Dr Duk",
        publishedAt: "2019-10-12T09:00:04Z",
        title:
          "콜린(Choline)영양소에 대해서~~~! 계란에 함유되어 있다? 치매, 치매예방(기능의학,영양의학)",
        isSaved: false,
        isWatched: false,
        isLiked: false,
      },
      {
        videoId: "felKaQEed1c",
        channelId: "UCF9vbHlZpz7FbOAky3fnYxw",
        channelTitle: "의학채널 비온뒤",
        publishedAt: "2019-12-23T09:00:08Z",
        title:
          "&quot;뇌영양제? 치매예방약?&quot; 이름은 하나인데 별명은 여러개~♪_치매 걱정되는데 👉콜린알포세레이트👈🤔 먹어야 할까?-서울브레인신경과 이일근 원장",
        isSaved: false,
        isWatched: false,
        isLiked: false,
      },
      {
        videoId: "RIMsqb-1aCo",
        channelId: "UCmBa7nrktYqWvhxhNzNTw8Q",
        channelTitle: "COLL!N - Topic",
        publishedAt: "2019-07-03T14:23:09Z",
        title: "ORANGE",
        isSaved: false,
        isWatched: false,
        isLiked: false,
      },
      {
        videoId: "JsYMtNXDO1I",
        channelId: "UCkCxYu8Ss6h5K7iKPz2SAZw",
        channelTitle: "코트덕",
        publishedAt: "2021-02-22T02:00:03Z",
        title: "&#39;무야호&#39;는 도대체 무엇일까?(무야호 유래)",
        isSaved: false,
        isWatched: false,
        isLiked: false,
      },
      {
        videoId: "hluEw50uVIw",
        channelId: "UCYBV17wHgK0_nIkkvQLW5ZA",
        channelTitle: "JFF",
        publishedAt: "2020-12-21T12:59:39Z",
        title: "무야호 리믹스",
        isSaved: false,
        isWatched: false,
        isLiked: false,
      },
    ]);
    cy.reload();
    cy.get(".video-view").find(".clip").should("be.visible");
  });
});
