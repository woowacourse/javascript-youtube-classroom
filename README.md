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

## 기능 구현 목록

### Step 1

1. 검색 버튼을 클릭할 시에 검색 모달을 표시한다.

- 검색어를 입력하면 스크롤을 맨 위로 위치시킨다.

2. 검색창에 검색어를 입력한 후 검색 버튼을 클릭하면 Youtube로 요청을 보낸다.

- 검색어는 1글자 이상이어야 한다.
- 검색어를 Youtube API에 전달한다.
- 응답이 오기 전까지 다음에 표시할 10개의 항목에 대해서 로딩을 표시한다.

3. 요청해서 받은 결과 10개를 표시한다.

- 기존에 로딩을 표시하던 화면 대신에 결과를 표시한다.
- 결과가 없으면 결과없음을 표시한다

4. 스크롤을 내리면 추가적으로 10개를 표시한다.

- 다음 10개를 받아오기 위한 요청을 전달한다.
- 응답이 오기 전까지 다음에 표시할 10개의 항목에 대해서 로딩을 표시한다.
- 응답이 오면 기존에 로딩을 표시하던 화면 대신에 결과를 표시한다.

5. 영상의 저장 버튼을 누르면 Web Storage에 영상 id를 저장한다.

- 저장 버튼을 누르면 id를 저장한다.
- 저장된 영상에 대해서는 저장하기 버튼을 숨긴다.
- 저장한 영상이 검색 결과에 포함되어 있을 경우에 저장하기 버튼을 표시하지 않는다.
- 저장한 비디오가 100개가 넘으면 경고를 보여준다.

### step2

기능 요구 사항
- [ ] 가장 처음에는 저장된 영상이 없으므로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- [ ] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 볼 영상들의 리스트를 보여준다.
- [ ] 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [ ] ✅ 본 영상으로 체크
  - [ ] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- [ ] 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.
- [ ] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 변경한다.
  - 1280px 이하: 4개
  - 960px이상~1280px 미만: 3개
  - 600px이상~960px 미만: 2개
  - 600px 미만: 1개

테스트 요구사항
- [ ] 핵심 플로우에 대한 E2E 테스트를 작성한다.
  - 검증이 필요하다고 생각되는 플로우를 1가지 설정하고 이에 대한 검증을 E2E 테스트로 진행한다.

### 구현 기능 목록
1. 저장된 영상이 없는 경우 검색을 통해서 영상을 저장할 수 있다는 이미지와 설명을 추가한다.

2. 저장한 영상를 보여주는 페이지를 구현한다.
  - 보지 않은 영상에서 해당 영상을 본 영상으로 이동시키는 버튼을 구현한다.(+ 반대)
  - 저장한 영상을 삭제할 수 있는 버튼을 구현한다.
    - 정말로 삭제할 지 여부를 묻는 기능을 구현한다.
  - 탭을 전환하는 버튼을 구현해서 탭에 따라 표시는 영상이 필터링 될 수 있도록 구현한다.

3. 반응형 웹을 구현한다.


## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는우
선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을설
치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

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

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-youtube-classroom/issues)에 등
록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE)
licensed.
