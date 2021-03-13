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

- [x] [유튜브 검색 API](https://developers.google.com/youtube/v3/getting-started?hl=ko)를 통해서, 내가 추가로 보고 싶은 영상들을 검색할 수 있다.
  - [x] 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
- [x] 로딩컴포넌트: 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
  - [x] 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- [x] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그다음 10개 아이템을 추가로 api요청하여 불러온다.
- [x] 내가 검색한 영상들의 json 데이터를 `저장`할 수 있다. (실제 저장이 아닌 영상 id를 Web Storage에 저장). 단 이미 저장된 경우는 저장 버튼이 보이지 않게 한다.
- [x] 저장 가능한 최대 동영상의 갯수는 100개이다.
- [x] 검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [x] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.
  - [x] 최근 검색 키워드를 클릭시, 해당 검색어로 검색된 결과를 보여준다.
  - [x] 최근 검색어 내에 있는 키워드를 클릭하거나, 검색하면 (중복 시) 최근 검색어에서 가장 앞으로 이동 및 검색결과를 표시한다.
  - [x] 최근 검색어를 local Storage에 저장한다.

### step1 테스트 항목

- [x] 사용자가 검색어를 입력하고 검색 버튼을 눌렀을 때, 검색 결과가 화면에 나타난다.
- [x] 사용자가 검색어를 입력하고 검색 버튼을 눌렀을 때, 최근 검색어에 추가 된다.
  - [x] 검색결과는 가장 왼쪽에 추가되고, 저장된 검색어가 3개 이상인 경우 가장 오른쪽 검색어를 삭제한다.
  - [x] 사용자가 최근 검색어에 있는 검색어로 검색했을 때, 해당 검색어가 최근 검색어의 맨 앞에 위치하고, 최근 검색어의 길이는 변화가 없다.
- [x] 최근 검색 키워드를 클릭시, 해당 검색어로 검색된 결과를 보여준다.
- [x] 사용자가 검색어를 아무것도 입력하지 않을 때, 아무반응도 일어나지 않는다.
- [x] 사용자가 영상 저장 버튼을 누르면, 해당 저장 버튼이 사라지고, 우측 위 저장된 영상 개수가 1 증가한다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
- [x] 사용자가 영상 저장 버튼을 눌렀는데, 현재 저장된 영상이 100개 인 경우 '저장할 수 없습니다'라는 alert 를 띄운다.
- [x] 사용자가 스크롤을 내리면, 밑에 영상이 추가된다.
- [x] 사용자가 모달창을 끄고, 다시 켰을 때 기존 검색 결과가 유지된다.
- [x] 각 영상이 제목, 작성자, 날짜가 제대로 화면에 표시되는지 확인한다.
- [x] 사용자가 검색 했을 때, 검색결과가 나오기 이전에 로딩중임을 skeleton UI로 보여주는지 확인한다.

### 🎯🎯 step2 강의실 관리 기능

- [x] 가장 처음에는 저장된 영상이 없으므로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- [x] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 **볼 영상**들의 리스트를 보여준다.
  - [x] 레이지 로딩 기능을 구현한다.
- [x] 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [x] ✅ 본 영상으로 체크
  - [x] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있습니다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- [x] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 `snackbar`를 통해 보여준다.
- [x] 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.

### step2 테스트 항목

- [x] 첫 화면에 로컬스토리지에 있는 볼 영상의 video 배열이 화면에 나타나는지 확인한다.
- [x] '볼 영상'에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면, 해당 영상이 화면에서 사라지고, '본 영상'버튼을 클릭 했을때, 해당 화면에서 확인할 수 있다.
- [x] '볼 영상'에 있는 비디오의 '삭제 버튼 🗑️'을 수르면, 정말로 삭제할 것인지 `confirm` 을 이용하여 확인 한 후, '확인'을 누르면 로컬스토리지에서 삭제 및 화면에서 사라진다. ('정말로 삭제하시겠습니까?')
- [x] '볼 영상'에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면 화면에서 사라지고, '본영상으로 저장에 성공 했습니다'라는 문구를 `snackbar`를 통해 보여준다.
- [x] 저장된 영상이 없을때, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.

### 🎯🎯🎯 step3 유저 경험 증가 기능

- [ ] 👍 좋아요 버튼을 누른 데이터만 필터링해서 보여줄 수 있는 메뉴를 만든다.
  - [ ] 👍 좋아요 버튼을 누른 경우, 로컬에서 데이터를 변경한다.
  - [ ] 👍 좋아요 버튼을 다시 클릭해서 해지할 수 있어야 한다.
- [ ] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색 결과의 row 당 column 개수를 변경한다.
  - 992px 이하: 4개
  - 768px 이하: 2개
  - 576px 이하: 1개
- [ ] 스크롤 페이징 방식을 이용해서 Lazy loading을 개선한다.

### step3 테스트 항목

- [ ] 👍 좋아요 버튼을 누르면 localStorage에서 해당 영상에 대한 정보가 업데이트 되어야 한다.
- [ ] 볼/본 영상 및 동영상 검색 결과에서 디바이스의 가로길이에 따라 row당 적절한 video개수가 노출되어야 한다.
  - 992px 이하: 4개
  - 768px 이하: 2개
  - 576px 이하: 1개

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
