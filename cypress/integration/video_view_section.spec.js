/// <reference types="cypress" />
import { setDataToLocalStorage } from "../../src/js/utils/localStorage.js";
import { STORAGE, CLASS_NAME, STANDARD_NUMS } from "../../src/js/utils/constants.js";

context("저장된 비디오 관리", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
  });

  it("초기에 저장된 비디오가 존재하지 않는다면, 비어있다는 것을 사용자에게 알려주는 이미지를 보여준다.", () => {
    cy.get(`.${CLASS_NAME.NO_SAVED_VIDEO_IMAGE}`).should("be.visible");
  });

  it("초기에 저장된 비디오가 존재한다면, 비디오 리스트를 출력한다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.VIDEO_VIEW}`).find(`.${CLASS_NAME.CLIP}`).should("be.visible");
  });

  it("볼 영상 리스트에서 비디오의 체크 버튼을 누르면 볼 영상 리스트에서는 삭제되고, 본 영상 리스트에 추가된다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.WATCH_LATER_BTN}`).click();
    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      const watchedVideoId = $clipActions.attr("data-video-id");

      cy.wrap($clipActions.eq(0).find(`.${CLASS_NAME.WATCHED_CHECK}`)).click();
      cy.get(`.${CLASS_NAME.WATCHED_BTN}`).click();
      cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`)
        .eq(0)
        .invoke("attr", "data-video-id")
        .should("eq", watchedVideoId);
    });
  });

  it("본 영상 리스트에서 비디오의 체크 버튼을 누르면 본 영상 리스트에서는 삭제되고, 볼 영상 리스트에 추가된다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      const watchedVideoId = $clipActions.attr("data-video-id");

      cy.wrap($clipActions.eq(0).find(`.${CLASS_NAME.WATCHED_CHECK}`)).click();
      cy.get(`.${CLASS_NAME.WATCHED_BTN}`).click();
      cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
        cy.wrap($clipActions.eq(0).find(`.${CLASS_NAME.WATCHED_CHECK}`)).click();
        cy.get(`.${CLASS_NAME.WATCH_LATER_BTN}`).click();
        cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`)
          .eq(0)
          .invoke("attr", "data-video-id")
          .should("eq", watchedVideoId);
      });
    });
  });

  it("본 영상 리스트의 모든 비디오의 체크 버튼은 활성화 상태여야 한다. ", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      cy.wrap($clipActions.eq(0).find(`.${CLASS_NAME.WATCHED_CHECK}`)).click();
      cy.get(`.${CLASS_NAME.WATCHED_BTN}`).click();
      cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).each(clipActions => {
        cy.wrap(clipActions).find(`.${CLASS_NAME.WATCHED_CHECK}`).should("have.class", "opacity-1");
      });
    });
  });

  it("동영상 검색 버튼을 눌렀다가, 모달을 닫으면 볼 영상 메뉴가 선택된 상태로 돌아간다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.VIDEO_SEARCH_BTN}`).click();
    cy.get(`.${CLASS_NAME.MODAL_CLOSE}`).click();
    cy.get(`.${CLASS_NAME.WATCH_LATER_BTN}`).should("have.class", "bg-cyan-100");
    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`)
      .eq(0)
      .find(`.${CLASS_NAME.WATCHED_CHECK}`)
      .should("have.class", "opacity-hover");
  });

  it("볼 영상 리스트에서 비디오의 휴지통 버튼을 누르면, 볼 영상 리스트에서 삭제된다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.WATCH_LATER_BTN}`).click();
    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      const removeVideoId = $clipActions.attr("data-video-id");
      cy.wrap($clipActions.eq(0).find(`.${CLASS_NAME.TRASH_CAN}`)).click();
      cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).each($clipActions => {
        cy.wrap($clipActions.attr("data-video-id")).should("not.eq", removeVideoId);
      });
    });
  });

  it("볼 영상 리스트에서 체크 버튼, 휴지통 버튼을 누르면 스낵바가 3초간 띄워진다.", () => {
    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, dummyVideos);
    cy.reload();

    cy.get(`.${CLASS_NAME.WATCH_LATER_BTN}`).click();
    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      $clipActions.eq(0).find(`.${CLASS_NAME.WATCHED_CHECK}`).click();
    });

    cy.get(`.${CLASS_NAME.SNACKBAR}`).should("have.class", "show");
    cy.wait(STANDARD_NUMS.SNACKBAR_DELAY);
    cy.get(`.${CLASS_NAME.SNACKBAR}`).should("not.have.class", "show");

    cy.get(`.${CLASS_NAME.CLIP_ACTIONS}`).then($clipActions => {
      $clipActions.eq(0).find(`.${CLASS_NAME.TRASH_CAN}`).click();
    });

    cy.get(`.${CLASS_NAME.SNACKBAR}`).should("have.class", "show");
    cy.wait(STANDARD_NUMS.SNACKBAR_DELAY);
    cy.get(`.${CLASS_NAME.SNACKBAR}`).should("not.have.class", "show");
  });
});

const dummyVideos = [
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
];
