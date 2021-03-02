const { getVideos } = require('../../src/js/utils/youtube');

describe('유튜브 강의실 영상 검색 모달', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('검색어에 맞게 데이터를 잘 가져오는지 확인한다.', () => {
    const searchTerm = '서니'
    getVideos(searchTerm).then(res => {
      expect(res.status).to.equal(200)
    });
  })
});