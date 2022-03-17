import videoStorage from "../../src/js/VideoStorage";

describe("사용자가 저장한 비디오 목록이 존재하는지 확인한다.", () => {
  it("사용자가 저장한 비디오 목록이 존재하지 않을 경우 나만의 유튜브 강의실 메인 화면에 '저장된 비디오 목록이 없습니다.' 메시지를 보여준다.", () => {
    cy.visit("./index.html");

    cy.get(".save-video-container__no-video-list").should("be.visible");
  });

  it("사용자가 저장한 비디오 목록이 존재할 경우 나만의 유튜브 강의실 메인 화면에 저장된 비디오 목록을 보여준다.", () => {
    videoStorage.addVideo({
      videoId: "kkojaeId",
      thumbnailUrl: "https:",
      title: "this is title",
      channelName: "kkojae's channel",
      publishDate: "2022년 3월 3일",
    });

    cy.visit("./index.html");
    cy.get(".save-video-container__video-list").should("be.visible");
  });
});

it("삭제 이모지를 클릭할 경우 정말 삭제할지 확인한다.", () => {
  videoStorage.addVideo({
    videoId: "kkojaeId",
    thumbnailUrl: "https:",
    title: "this is title",
    channelName: "kkojae's channel",
    publishDate: "2022년 3월 3일",
  });

  cy.visit("./index.html");

  const confirmStub = cy.stub();
  cy.on("window:confirm", confirmStub);

  cy.get(".video-item__delete-video-button")
    .eq(0)
    .click()
    .then(() => {
      expect(confirmStub).to.be.called();
    });
});
