describe("나만의 유튜브 강의실 메인 화면 로직 테스트.", () => {
  it("나만의 유튜브 강의실 사이트에 방문시 저장한 비디오 목록이 존재하지 않을 경우 메인 화면에 '저장된 비디오 목록이 없습니다.' 메시지를 보여준다.", () => {
    cy.visit("./index.html");

    cy.get(".save-video-container__no-video-list").should("be.visible");
  });

  it("나만의 유튜브 강의실 사이트에 방문시 저장한 비디오 목록이 존재할 경우 메인 화면에 저장된 비디오 목록을 보여준다.", () => {
    cy.addVideo("kkojaeId", false);

    cy.visit("./index.html");

    cy.get(".save-video-container__video-list").should("be.visible");
  });

  it("저장된 비디오 목록에서 🗑 이모지를 클릭할 경우 정말 삭제할지 확인하는 메시지를 보여준 후 확인 버튼을 누르면 해당하는 영상이 제거된다.", () => {
    cy.addVideo("kkojaeId", false);
    cy.addVideo("usageId", false);

    cy.visit("./index.html");

    const confirmStub = cy.stub();
    cy.on("window:confirm", confirmStub);

    cy.get(".video-item__delete-video-button")
      .eq(0)
      .click()
      .then(() => {
        expect(confirmStub).to.be.called;
      });

    cy.get(".video-item__delete-video-button").should("have.length", 1);
  });

  it("저장된 비디오 목록에서 ✅ 이모지를 클릭할 경우 해당 영상은 시청한 영상으로 체크된다.", () => {
    cy.addVideo("kkojaeId", false);

    cy.visit("./index.html");

    cy.get(".video-item__watched-video-button").eq(0).click();
    cy.get(".video-item__watched-video-button")
      .invoke("attr", "class")
      .should(
        "eq",
        "video-item__watched-video-button button video-item__watched-video-button--focused"
      );
  });

  it("나만의 유튜브 강의실 상단 네비게이션 바의 '👁 본 영상' 버튼을 을 클릭하면 시청한 영상으로 체크된(✅ 이모지를 클릭한) 비디오 영상만 필터링 하여 보여준다.", () => {
    cy.addVideo("kkojaeId", false);
    cy.addVideo("usageId", false);

    cy.visit("./index.html");

    cy.get(".video-item__watched-video-button").eq(0).click();
    cy.get(".nav__watched-video-button").click();
    cy.get(".save-video-item").should("have.length", 1);
  });
});
