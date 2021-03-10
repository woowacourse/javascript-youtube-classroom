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

### 🎯 step1 검색 기능

- [ ] [유튜브 검색 API](https://developers.google.com/youtube/v3/getting-started?hl=ko)를 통해서, 내가 추가로 보고 싶은 영상들을 검색할 수 있다.
  - [ ] 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
- [ ] 로딩컴포넌트: 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [ ] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
  - [ ] 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- [ ] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그다음 10개 아이템을 추가로 api요청하여 불러온다.
- [ ] 내가 검색한 영상들의 json 데이터를 `저장`할 수 있다. (실제 저장이 아닌 영상 id를 Web Storage에 저장). 단 이미 저장된 경우는 저장 버튼이 보이지 않게 한다.
- [ ] 저장 가능한 최대 동영상의 갯수는 100개이다.
- [ ] 검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [ ] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.

### ✅ TODO(FEAT) - step1

- [x] eslint, prettier, cypress 환경설정
- [x] TODO 작성
- [x] 클릭한 탭의 색을 하이라이트한다.
- [x] `동영상 검색` 버튼을 누르면 검색 모달 창이 열린다.
- [x] 검색 모달 창의 x 버튼을 누르면 검색 모달 창이 닫히고, 볼 영상 목록으로 돌아간다.
- [x] 최근 검색어에 목록에 최근 검색한 검색어가 3개 뜬다.
- [x] 가장 마지막에 검색한 검색 결과 동영상들을 보여준다.
- [x] 검색어를 입력 받을 수 있다.
- [x] 검색을 실행하면 youtube api를 통해 사용자가 입력한 검색어로 검색 결과를 가져온다.
- [x] youtube api에서 결과를 가져오는 동안 skeleton card UI로 로딩 화면을 보여준다.
- [x] youtube api를 통해 가져온 검색 결과를 10개씩 보여준다.
- [x] 검색 후 스크롤을 끝까지 이동시킬 경우 api 추가 요청을 통해 검색 결과를 10개씩 더 보여준다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 보여준다.
- [x] 검색 결과 동영상의 저장 버튼을 누르면 Web Storage에 저장한다.
  - [x] 저장한 동영상들을 `볼 영상` 목록에 추가한다.
  - [x] 이미 저장된 동영상의 경우 저장 버튼을 비활성화한다.
  - [x] 저장한 동영상의 개수를 업데이트한다.

### 👾 TODO(TEST) - step1

- [x] 클릭한 탭의 색을 하이라이트한다.
- [x] `동영상 검색` 버튼을 누르면 검색 모달 창이 열린다.
- [x] 검색 모달 창의 x 버튼을 누르면 검색 모달 창이 닫히고, 볼 영상 목록으로 돌아간다.
- [x] 현재 검색한 검색어가 최근 검색어 목록에 남는다.
- [x] youtube api에서 결과를 가져오는 동안 skeleton card UI로 로딩 화면을 보여준다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 보여준다.
- [x] 검색 후 스크롤을 끝까지 이동시킬 경우 api 추가 요청을 통해 검색 결과를 10개씩 더 보여준다.
- [x] 검색 결과 동영상의 저장 버튼을 누르면 저장한 동영상들을 `볼 영상` 목록에 보여준다.
- [x] 최근 검색어를 누르면 해당 검색어로 검색을 실행한 결과를 보여준다.

### 🎯🎯 step2 강의실 관리 기능

- [ ] 가장 처음에는 저장된 영상이 없음으로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- [ ] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 **볼 영상**들의 리스트를 보여준다.
- [ ] 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [ ] ✅ 본 영상으로 체크
  - [ ] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있습니다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- [ ] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 `snackbar`를 통해 보여준다.
- [ ] 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.

### ✅ TODO(FEAT) - step2
- [x] 영상을 100개 넘게 저장할 경우 alert을 띄운다.  
- [x] 가장 처음에는 저장된 영상이 없으므로, 비어있다는 것을 알려주는 이미지와 텍스트를 보여준다. 
- [x] 모달에서 저장을 하면 성공/실패 여부를 알리는 snackbar를 띄운다.  
- [x] ✅ 본 영상을 체크하면 본 영상 목록에 저장하고, 버튼의 투명도가 바뀐다. 
- [x] 🗑️ 버튼으로 localStorage의 저장된 리스트에서 동영상을 삭제한다.  
  - [x] 🗑️ 버튼으로 영상 삭제 시 사용자에게 정말 삭제할 것인지 물어보는 alert를 띄운다.
- [x] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 snackbar를 통해 보여준다.
- [ ] 본 영상 탭을 누르면 본 영상들의 목록을 보여준다. 
- [ ] 볼 영상 탭을 누르면 볼 영상들의 목록을 보여준다.

### 👾 TODO(TEST) - step2
- [x] 영상을 100개 넘게 저장 시 alert을 띄운다.  
- [x] 가장 처음에는 비어있다는 것을 알려주는 이미지와 텍스트를 보여준다. 
- [x] 모달에서 저장을 하면 snackbar를 보여준다.  
- [x] ✅ 본 영상을 체크하면 버튼의 투명도가 바뀌고, snackbar를 띄운다.
- [x] 🗑️ 버튼 클릭 시 사용자에게 정말 삭제할 것인지 물어보는 alert가 나오고, 동의 시 snackbar를 띄운다.
- [ ] 본 영상 탭을 누르면 본 영상들의 목록을 보여준다. 
- [ ] 볼 영상 탭을 누르면 볼 영상들의 목록을 보여준다.

### 🎯🎯🎯 step3 유저 경험 증가 기능

- [ ] 내가 본 영상 중 좋은 영상에는 좋아요, 코멘트를 직접 추가할 수 있다. (실제 유튜브 영상에 추가하는 api 사용)
  - [ ] 👍 좋아요 API를 이용하여 전송
  - [ ] 💬 댓글 API를 이용하여 전송 (댓글 전송을 위한 modal과 form은 스스로 구현합니다.)
- [ ] 좋아요 버튼을 누른 데이터만 필터링해서 보여준다.
- [ ] 다크 모드를 위한 버튼을 만든다. 버튼 ui는 직접 만든다.
  - [ ] 모든 글자 색상은 #FFFFFF, 배경 색상은 #000000 로 한정한다.
- [ ] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색 결과의 row 당 column 개수를 변경한다.
  - 992px 이하: 4개
  - 768px 이하: 2개
  - 576px 이하: 1개
- [ ] 스크롤 페이징 방식을 이용해서 Lazy loading을 개선한다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-youtube-classroom/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
