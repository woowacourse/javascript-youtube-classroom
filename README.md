<p align="middle" >
  <img width="200px;" src="./images/laptop_with_youtube_logo.png"/>
</p>
<h2 align="middle">level1 - 나만의 유튜브 강의실</h2>
<p align="middle">자바스크립트와 외부 API를 이용해 구현 하는 나만의 유튜브 강의실</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

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

## 📍 학습 목표

이번 미션의 주요 목표는 웹 프론트엔드에서의 비동기에 대해 이해하고,
API 통신을 처리할 때 고려해야 하는 다양한 문제를 직접 경험해보면서 해결 방법을 고민해보는 것입니다.

- 실제 동작하는 API를 사용하며 기술적, UX적으로 겪게되는 문제를 해결해보는 경험
- 무한 스크롤 구현

<br>

## 🎯 기능 요구사74항

### 🔎 검색 모달

#### 검색

- [x] 유튜브 검색 API를 사용해 내가 보고 싶은 영상들을 검색할 수 있다.
  - [x] 입력 예외 처리
    - [x] 입력된 검색어가 없거나, 공백만 입력된 경우 검색이 안되게 한다.
  - [x] 엔터키를 눌러 검색할 수 있다.
  - [x] 검색 버튼을 클릭해 검색할 수 있다.

#### 검색 결과

- [x] 데이터를 불러오는 동안 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [ ] 검색 결과가 없는 경우 src/images/status/not_found.png 경로에 있는 결과 없음 이미지를 보여준다.
- [ ] 최초 검색 결과는 10개까지만 불러온다.
- [ ] 스크롤을 내려 추가 검색 결과를 10개씩 불러올 수 있다.
  - [ ] 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 10개 아이템을 추가로 불러온다.
  - [ ] 스크롤 이벤트가 발생했을 시, Throttle을 적용한다.
- [ ] 검색결과가 처리되기 전까진 skeleton UI로 로딩화면을 보여준다.

#### 저장

- [ ] 내가 검색한 영상들의 저장할 수 있다.
  - [ ] 저장되는 영상의 형태는 json 데이터이다.
  - [ ] 실제로 동영상을 저장하는 것이 아니라, 영상 id를 Web Storage에 저장한다.
  - [ ] 이미 저장된 영상이라면 저장 버튼이 보이지 않도록 한다.
  - [ ] 저장 가능한 최대 동영상의 갯수는 100개이다.

### 테스트 요구사항

- [ ] 비즈니스 로직에 대한 단위 테스트를 Jest로 작성한다.
  - [x] 입력 예외 처리
    - [x] 입력된 검색어가 없거나, 공백만 입력된 경우 검색이 안되게 한다.

### UI

- [ ] [figma 시안](https://www.figma.com/file/uduGjrly94dKOdzUmAXU0Q/%EB%A0%88%EB%B2%A81-%EB%AF%B8%EC%85%98-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4%3A34)을 기준으로 구현한다.

### 빌드

- [x] Webpack을 사용해 스스로 빌드 환경을 구축한다.

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-youtube-classroom/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
