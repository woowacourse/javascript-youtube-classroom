<p align="middle" >
  <img width="200px;" src="./src/images/readme/laptop_with_youtube_logo.png"/>
</p>
<h2 align="middle">level1 - 나만의 유튜브 강의실</h2>
<p align="middle">자바스크립트와 외부 API를 이용해 구현 하는 나만의 유튜브 강의실</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img src="./src/images/readme/youtube_classroom_preview.png">
</p>

## 기능 구현 목록

### step1 검색 기능

- [x] 유튜브 검색 모달에서, 검색을 하면 동영상 리스트(10개)를 불러온다.
  - [x] 결과 노출 전까지 skeleton UI를 보여준다.
  - [x] 스크롤 시, 추가로 동영상 리스트 10개를 보여준다.
  - [x] 결과가 없을 경우, 결과 없음 이미지를 보여준다.
- [x] 검색한 영상의 저장 버튼을 누르면 볼 영상 리스트에 추가된다.
  - [x] 이미 저장된 영상은 검색결과에서 저장 버튼이 나타나지 않는다.
  - [x] 저장 가능한 최대 동영상 갯수는 100개이다.
- [x] 검색 모달에 다시 접근했을 때, 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [x] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.

### step2 강의실 관리 기능

- [x] 저장된 영상이 없을 때, 사용자에게 빈 상태를 UI로 알려준다.
- [x] 영상 카드의 `본 영상 추가 버튼`을 눌렀을 때, 본 영상으로 분류한다.
- [x] 영상 카드의 `삭제 버튼`을 눌렀을 때, 저장 영상 목록에서 삭제한다.
- [x] 유저 액션에 대한 결과를 snackbar 로 보여 준다.
- [x] 본 영상과 볼 영상을 필터링한다.

### UI / UX 수정 사항

- [x] 모달 UI 패딩, 마진 재조정
- [ ] 모달 딤드 영역의 클릭 이벤트 처리
- [x] 동영상 검색 버튼 레이아웃 수정
- [x] 모달 내의 저장 버튼에 저장과 취소 기능 부여하기
- [ ] 동영상 로딩 최적화
