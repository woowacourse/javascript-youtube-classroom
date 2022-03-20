/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/js/Database/index.js":
/*!**********************************!*\
  !*** ./src/js/Database/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");

var Database = {
  save: function save(key, value) {
    localStorage.setItem(key, JSON.stringify([].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(Database.load(key)), [value])));
  },
  overwrite: function overwrite(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load: function load(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Database);

/***/ }),

/***/ "./src/js/Interactor/Helper.js":
/*!*************************************!*\
  !*** ./src/js/Interactor/Helper.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Database_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Database/index.js */ "./src/js/Database/index.js");
/* harmony import */ var _YoutubeAPI_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../YoutubeAPI/index.js */ "./src/js/YoutubeAPI/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






var Helper = {
  findVideoById: function findVideoById(id) {
    var videos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Database_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.DATABASE_VIDEO_KEY);
    return _utils_fx_js__WEBPACK_IMPORTED_MODULE_5__._.find(function (_ref) {
      var videoId = _ref.videoId;
      return videoId === id;
    }, videos);
  },
  findVideoIndexById: function findVideoIndexById(id) {
    var videos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Database_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.DATABASE_VIDEO_KEY);
    return videos.findIndex(function (_ref2) {
      var videoId = _ref2.videoId;
      return videoId === id;
    });
  },
  convertVideoToItem: function convertVideoToItem(_ref3) {
    var id = _ref3.id,
        snippet = _ref3.snippet;
    return {
      id: id.videoId,
      thumbnail: snippet.thumbnails["default"].url,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      date: (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.formatDate)(snippet.publishTime),
      saved: Helper.findVideoById(id.videoId) !== undefined
    };
  },
  fetchVideo: function fetchVideo() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants_index_js__WEBPACK_IMPORTED_MODULE_4__.REDIRECT_SERVER_HOST.DUMMY;
    return _utils_fx_js__WEBPACK_IMPORTED_MODULE_5__._.go(_YoutubeAPI_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getVideos(host), _utils_fx_js__WEBPACK_IMPORTED_MODULE_5__._.map(Helper.convertVideoToItem))["catch"](function () {
      return Helper.fetchVideo(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.REDIRECT_SERVER_HOST.DUMMY);
    });
  },
  searchVideo: function searchVideo(keyword) {
    _YoutubeAPI_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].readyToFetch(keyword);
    return Helper.fetchVideo();
  },
  saveVideo: function saveVideo(video) {
    return _Database_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].save(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.DATABASE_VIDEO_KEY, _objectSpread(_objectSpread({}, video), {}, {
      checked: false
    }));
  },
  loadVideo: function loadVideo() {
    return _Database_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.DATABASE_VIDEO_KEY);
  },
  overiteVideos: function overiteVideos(videos) {
    return _Database_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].overwrite(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.DATABASE_VIDEO_KEY, videos);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Helper);

/***/ }),

/***/ "./src/js/Interactor/Validator.js":
/*!****************************************!*\
  !*** ./src/js/Interactor/Validator.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Database_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Database/index.js */ "./src/js/Database/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");


var Validator = {
  checkKeyword: function checkKeyword(keyword) {
    if (keyword.trim() === '') throw new Error(_constants_index_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.EMPTY_KEYWORD);
  },
  checkFullOfDatabase: function checkFullOfDatabase() {
    if (_Database_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(_constants_index_js__WEBPACK_IMPORTED_MODULE_1__.DATABASE_VIDEO_KEY) >= _constants_index_js__WEBPACK_IMPORTED_MODULE_1__.MAX_DATABASE_CAPACITY) throw new Error(_constants_index_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.FULL_OF_DATABASE);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Validator);

/***/ }),

/***/ "./src/js/Interactor/index.js":
/*!************************************!*\
  !*** ./src/js/Interactor/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Validator.js */ "./src/js/Interactor/Validator.js");
/* harmony import */ var _Helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helper.js */ "./src/js/Interactor/Helper.js");
/* harmony import */ var _Views_KeywordInputView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/KeywordInputView.js */ "./src/js/Views/KeywordInputView.js");
/* harmony import */ var _Views_VideoView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Views/VideoView.js */ "./src/js/Views/VideoView.js");
/* harmony import */ var _Views_SearchModalView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Views/SearchModalView.js */ "./src/js/Views/SearchModalView.js");
/* harmony import */ var _Views_SwitchVideoView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Views/SwitchVideoView.js */ "./src/js/Views/SwitchVideoView.js");
/* harmony import */ var _Views_UnseenVideoListView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Views/UnseenVideoListView.js */ "./src/js/Views/UnseenVideoListView.js");
/* harmony import */ var _Views_SeenVideoListView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Views/SeenVideoListView.js */ "./src/js/Views/SeenVideoListView.js");
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");









var keywordInputView = new _Views_KeywordInputView_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
var searchModalView = new _Views_SearchModalView_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
var videoView = new _Views_VideoView_js__WEBPACK_IMPORTED_MODULE_3__["default"](_Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].fetchVideo);
var switchVideoView = new _Views_SwitchVideoView_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
var unseenVideoListView = new _Views_UnseenVideoListView_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
var seenVideoListView = new _Views_SeenVideoListView_js__WEBPACK_IMPORTED_MODULE_7__["default"]();

var handleKeywordInputSubmit = function handleKeywordInputSubmit(keyword) {
  try {
    _Validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkKeyword(keyword);
    videoView.refreshVideoScreen();
    videoView.onSkeleton();

    _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.go(keyword, _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].searchVideo, function (videos) {
      videoView.renderScreenByVideos(videos);
      videoView.offSkeleton();
    });
  } catch (_ref) {
    var message = _ref.message;
    alert(message);
  }
};

var handleSearchModalButtonClick = function handleSearchModalButtonClick() {
  keywordInputView.refreshInput();
  videoView.refreshVideoScreen();
};

var handleSwitchUnseenButtonClick = _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.pipe(_Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadVideo, _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.filter(function (_ref2) {
  var checked = _ref2.checked;
  return !checked;
}), unseenVideoListView.renderScreenByVideos.bind(unseenVideoListView));

var handleSwitchSeenButtonClick = _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.pipe(_Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadVideo, _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.filter(function (_ref3) {
  var checked = _ref3.checked;
  return checked;
}), seenVideoListView.renderScreenByVideos.bind(seenVideoListView));

var handleSaveVideoButtonClick = function handleSaveVideoButtonClick(video) {
  try {
    _Validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkFullOfDatabase();
    _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveVideo(video);
    handleSwitchUnseenButtonClick();
  } catch (_ref4) {
    var message = _ref4.message;
    alert(message);
  }
};

var handleUnseenCheckButtonClick = function handleUnseenCheckButtonClick(id) {
  var videos = _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadVideo();
  _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].findVideoById(id, videos).checked = true;
  _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].overiteVideos(videos);
  handleSwitchUnseenButtonClick();
};

var handleVideoDeleteButtonClick = _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.curry(function (render, id) {
  var videos = _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadVideo();
  videos.splice(_Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].findVideoIndexById(id), 1);
  _Helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].overiteVideos(videos);
  render();
});

var runApp = function runApp() {
  keywordInputView.bindSubmitKeyword(handleKeywordInputSubmit);
  searchModalView.bindShowModal(handleSearchModalButtonClick);
  searchModalView.bindCloseModal();
  videoView.bindSaveVideo(handleSaveVideoButtonClick);
  switchVideoView.bindSwitchToSeenScreen(handleSwitchSeenButtonClick);
  switchVideoView.bindSwitchToUnseenScreen(handleSwitchUnseenButtonClick);
  unseenVideoListView.bindClickButtons(handleUnseenCheckButtonClick, handleVideoDeleteButtonClick(handleSwitchUnseenButtonClick));
  seenVideoListView.bindClickButtons(_utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.noop, handleVideoDeleteButtonClick(handleSwitchSeenButtonClick));
  handleSwitchUnseenButtonClick();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (runApp);

/***/ }),

/***/ "./src/js/Views/KeywordInputView.js":
/*!******************************************!*\
  !*** ./src/js/Views/KeywordInputView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KeywordInputView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");





function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }




var _$keywordInput = /*#__PURE__*/new WeakMap();

var _$searchForm = /*#__PURE__*/new WeakMap();

var KeywordInputView = /*#__PURE__*/function () {
  function KeywordInputView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, KeywordInputView);

    _classPrivateFieldInitSpec(this, _$keywordInput, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$searchForm, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$keywordInput, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.SEARCH_INPUT_KEYWORD));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$searchForm, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.SEARCH_FORM));
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(KeywordInputView, [{
    key: "refreshInput",
    value: function refreshInput() {
      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$keywordInput).value = '';
    }
  }, {
    key: "bindSubmitKeyword",
    value: function bindSubmitKeyword(handler) {
      var _this = this;

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$searchForm).addEventListener('submit', function (e) {
        e.preventDefault();
        handler((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(_this, _$keywordInput).value);
      });
    }
  }]);

  return KeywordInputView;
}();



/***/ }),

/***/ "./src/js/Views/SavedVideoListView.js":
/*!********************************************!*\
  !*** ./src/js/Views/SavedVideoListView.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SavedVideoListView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");





function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _$emptyScreen = /*#__PURE__*/new WeakMap();

var _$container = /*#__PURE__*/new WeakMap();

var _controllScreen = /*#__PURE__*/new WeakSet();

var SavedVideoListView = /*#__PURE__*/function () {
  function SavedVideoListView($emptyScreen, $container) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SavedVideoListView);

    _classPrivateMethodInitSpec(this, _controllScreen);

    _classPrivateFieldInitSpec(this, _$emptyScreen, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$container, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$emptyScreen, $emptyScreen);

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container, $container);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SavedVideoListView, [{
    key: "bindClickButtons",
    value: function bindClickButtons(checkButtonHandler, deleteButtonHandler) {
      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$container).addEventListener('click', function (e) {
        if (e.target.classList[0] === 'video-item__check-button') checkButtonHandler(e.target.dataset.videoId);else if (e.target.classList[0] === 'video-item__delete-button' && confirm(_constants_index_js__WEBPACK_IMPORTED_MODULE_4__.CONFIRM_DELETE_MESSAGE)) deleteButtonHandler(e.target.dataset.videoId);
      });
    }
  }, {
    key: "renderScreenByVideos",
    value: function renderScreenByVideos(videos) {
      if (videos.length > 0) {
        this.render(videos);
        this.videoScreen();
      } else {
        this.emptyScreen();
      }
    }
  }, {
    key: "renderHTML",
    value: function renderHTML(html) {
      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$container).replaceChildren();

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$container).insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: "emptyScreen",
    value: function emptyScreen() {
      _classPrivateMethodGet(this, _controllScreen, _controllScreen2).call(this, 'add');
    }
  }, {
    key: "videoScreen",
    value: function videoScreen() {
      _classPrivateMethodGet(this, _controllScreen, _controllScreen2).call(this, 'remove');
    }
  }]);

  return SavedVideoListView;
}();

function _controllScreen2(order) {
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$emptyScreen).classList[order]('empty');
}



/***/ }),

/***/ "./src/js/Views/SearchModalView.js":
/*!*****************************************!*\
  !*** ./src/js/Views/SearchModalView.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchModalView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");





function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _$modal = /*#__PURE__*/new WeakMap();

var _$searchModalButton = /*#__PURE__*/new WeakMap();

var _$modalBackground = /*#__PURE__*/new WeakMap();

var _controllModal = /*#__PURE__*/new WeakSet();

var SearchModalView = /*#__PURE__*/function () {
  function SearchModalView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SearchModalView);

    _classPrivateMethodInitSpec(this, _controllModal);

    _classPrivateFieldInitSpec(this, _$modal, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$searchModalButton, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$modalBackground, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$modal, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.SEARCH_MODAL));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$searchModalButton, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.SEARCH_MODAL_BUTTON));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$modalBackground, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.MODAL_BACKGROUND));
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchModalView, [{
    key: "bindShowModal",
    value: function bindShowModal(handler) {
      var _this = this;

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$searchModalButton).addEventListener('click', function () {
        handler();

        _classPrivateMethodGet(_this, _controllModal, _controllModal2).call(_this, 'remove');
      });
    }
  }, {
    key: "bindCloseModal",
    value: function bindCloseModal() {
      var _this2 = this;

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$modalBackground).addEventListener('click', _classPrivateMethodGet(this, _controllModal, _controllModal2).bind(this, 'add'));

      document.addEventListener('keyup', function (e) {
        if (e.key === 'Escape') {
          _classPrivateMethodGet(_this2, _controllModal, _controllModal2).call(_this2, 'add');
        }
      });
    }
  }]);

  return SearchModalView;
}();

function _controllModal2(order) {
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$modal).classList[order]('hide');
}



/***/ }),

/***/ "./src/js/Views/SeenVideoListView.js":
/*!*******************************************!*\
  !*** ./src/js/Views/SeenVideoListView.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeenVideoListView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _SavedVideoListView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SavedVideoListView.js */ "./src/js/Views/SavedVideoListView.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var SeenVideoListView = /*#__PURE__*/function (_SavedVideoListView) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(SeenVideoListView, _SavedVideoListView);

  var _super = _createSuper(SeenVideoListView);

  function SeenVideoListView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SeenVideoListView);

    return _super.call(this, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_7__.SELECTOR.SEEN_EMPTY_SCREEN), (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_7__.SELECTOR.SEEN_VIDEOS));
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SeenVideoListView, [{
    key: "render",
    value: function render(videos) {
      _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.go(videos, _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.map(function (video) {
        return "<li class=\"video-item\">\n          <img src=\"".concat(video.thumbnail, "\" alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n          <h4 class=\"video-item__title\">").concat(video.title, "</h4>\n          <p class=\"video-item__channel-name\">").concat(video.channeltitle, "</p>\n          <p class=\"video-item__published-date\">").concat(video.date, "</p>\n          <div class=\"video-item__button-wrap\">\n            <button class=\"video-item__check-button active button\">\u2705</button>\n            <button class=\"video-item__delete-button button\" data-video-id=\"").concat(video.videoId, "\">\uD83D\uDDD1\uFE0F</button>\n          </div>\n        </li>");
      }), _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.join(''), this.renderHTML.bind(this));
    }
  }]);

  return SeenVideoListView;
}(_SavedVideoListView_js__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/js/Views/SwitchVideoView.js":
/*!*****************************************!*\
  !*** ./src/js/Views/SwitchVideoView.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SwitchVideoView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");





function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _$app = /*#__PURE__*/new WeakMap();

var _$switchSeenButton = /*#__PURE__*/new WeakMap();

var _$switchUnseenButton = /*#__PURE__*/new WeakMap();

var _switchToScreen = /*#__PURE__*/new WeakSet();

var SwitchVideoView = /*#__PURE__*/function () {
  function SwitchVideoView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SwitchVideoView);

    _classPrivateMethodInitSpec(this, _switchToScreen);

    _classPrivateFieldInitSpec(this, _$app, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$switchSeenButton, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$switchUnseenButton, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$app, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.APP));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$switchSeenButton, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.SEEN_BUTTON));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$switchUnseenButton, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_5__.SELECTOR.UNSEEN_BUTTON));
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SwitchVideoView, [{
    key: "bindSwitchToUnseenScreen",
    value: function bindSwitchToUnseenScreen(handler) {
      var _this = this;

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$switchUnseenButton).addEventListener('click', function () {
        handler();

        _classPrivateMethodGet(_this, _switchToScreen, _switchToScreen2).call(_this, 'unseen');
      });
    }
  }, {
    key: "bindSwitchToSeenScreen",
    value: function bindSwitchToSeenScreen(handler) {
      var _this2 = this;

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$switchSeenButton).addEventListener('click', function () {
        handler();

        _classPrivateMethodGet(_this2, _switchToScreen, _switchToScreen2).call(_this2, 'seen');
      });
    }
  }]);

  return SwitchVideoView;
}();

function _switchToScreen2(screen) {
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$app).classList.remove('seen', 'unseen');

  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _$app).classList.add(screen);
}



/***/ }),

/***/ "./src/js/Views/UnseenVideoListView.js":
/*!*********************************************!*\
  !*** ./src/js/Views/UnseenVideoListView.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UnseenVideoListView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _SavedVideoListView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SavedVideoListView.js */ "./src/js/Views/SavedVideoListView.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var UnseenVideoListView = /*#__PURE__*/function (_SavedVideoListView) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(UnseenVideoListView, _SavedVideoListView);

  var _super = _createSuper(UnseenVideoListView);

  function UnseenVideoListView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, UnseenVideoListView);

    return _super.call(this, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_7__.SELECTOR.UNSEEN_EMPTY_SCREEN), (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_7__.SELECTOR.UNSEEN_VIDEOS));
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(UnseenVideoListView, [{
    key: "render",
    value: function render(videos) {
      _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.go(videos, _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.map(function (video) {
        return "<li class=\"video-item\">\n          <img src=\"".concat(video.thumbnail, "\" alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n          <h4 class=\"video-item__title\">").concat(video.title, "</h4>\n          <p class=\"video-item__channel-name\">").concat(video.channeltitle, "</p>\n          <p class=\"video-item__published-date\">").concat(video.date, "</p>\n          <div class=\"video-item__button-wrap\">\n            <button class=\"video-item__check-button button\" data-video-id=\"").concat(video.videoId, "\">\u2705</button>\n            <button class=\"video-item__delete-button button\" data-video-id=\"").concat(video.videoId, "\">\uD83D\uDDD1\uFE0F</button>\n          </div>\n        </li>");
      }), _utils_fx_js__WEBPACK_IMPORTED_MODULE_8__._.join(''), this.renderHTML.bind(this));
    }
  }]);

  return UnseenVideoListView;
}(_SavedVideoListView_js__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/js/Views/VideoView.js":
/*!***********************************!*\
  !*** ./src/js/Views/VideoView.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoView)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }





var _$container = /*#__PURE__*/new WeakMap();

var _io = /*#__PURE__*/new WeakMap();

var _$emptyScreen = /*#__PURE__*/new WeakMap();

var _$firstSkeleton = /*#__PURE__*/new WeakMap();

var _controllSkeleton = /*#__PURE__*/new WeakSet();

var _appendVideos = /*#__PURE__*/new WeakSet();

var _controllScreen = /*#__PURE__*/new WeakSet();

var _lastVideoItem = /*#__PURE__*/new WeakSet();

var _initializeFirstSkeleton = /*#__PURE__*/new WeakSet();

var VideoView = /*#__PURE__*/function () {
  function VideoView(videoAPI) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, VideoView);

    _classPrivateMethodInitSpec(this, _initializeFirstSkeleton);

    _classPrivateMethodInitSpec(this, _lastVideoItem);

    _classPrivateMethodInitSpec(this, _controllScreen);

    _classPrivateMethodInitSpec(this, _appendVideos);

    _classPrivateMethodInitSpec(this, _controllSkeleton);

    _classPrivateFieldInitSpec(this, _$container, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _io, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$emptyScreen, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _$firstSkeleton, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _$container, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_6__.SELECTOR.VIDEOS));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _io, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.intersectionObserver)(function () {
      _this.onSkeleton();

      return _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__._.go(videoAPI(), function (videos) {
        _classPrivateMethodGet(_this, _appendVideos, _appendVideos2).call(_this, videos);

        _this.offSkeleton();

        return _classPrivateMethodGet(_this, _lastVideoItem, _lastVideoItem2).call(_this);
      });
    }, {
      root: (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container)
    }));

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _$emptyScreen, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.$)(_constants_index_js__WEBPACK_IMPORTED_MODULE_6__.SELECTOR.EMPTY_SCREEN));

    _classPrivateMethodGet(this, _initializeFirstSkeleton, _initializeFirstSkeleton2).call(this);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(VideoView, [{
    key: "refreshVideoScreen",
    value: function refreshVideoScreen() {
      while ((0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).firstChild.classList[0] === 'video-item') {
        (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).firstChild.remove();
      }
    }
  }, {
    key: "renderScreenByVideos",
    value: function renderScreenByVideos(videos) {
      if (videos.length > 0) {
        _classPrivateMethodGet(this, _appendVideos, _appendVideos2).call(this, videos);

        (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _io).observe(_classPrivateMethodGet(this, _lastVideoItem, _lastVideoItem2).call(this));

        _classPrivateMethodGet(this, _controllScreen, _controllScreen2).call(this, 'remove');
      } else {
        _classPrivateMethodGet(this, _controllScreen, _controllScreen2).call(this, 'add');
      }
    }
  }, {
    key: "onSkeleton",
    value: function onSkeleton() {
      _classPrivateMethodGet(this, _controllSkeleton, _controllSkeleton2).call(this, 'add');
    }
  }, {
    key: "offSkeleton",
    value: function offSkeleton() {
      _classPrivateMethodGet(this, _controllSkeleton, _controllSkeleton2).call(this, 'remove');
    }
  }, {
    key: "bindSaveVideo",
    value: function bindSaveVideo(handler) {
      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).addEventListener('click', function (e) {
        if (e.target.dataset.videoId) {
          handler(_objectSpread({}, e.target.dataset));
          e.target.classList.add('saved');
        }
      });
    }
  }]);

  return VideoView;
}();

function _controllSkeleton2(order) {
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).classList[order]('loading');
}

function _appendVideos2(videos) {
  var _this2 = this;

  _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__._.go(videos, _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__._.map(function (video) {
    return "<li class=\"video-item\">\n            <img\n              src=\"".concat(video.thumbnail, "\"\n              alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n            <h4 class=\"video-item__title\">[Playlist] ").concat(video.title, "</h4>\n            <p class=\"video-item__channel-name\">").concat(video.channelTitle, "</p>\n            <p class=\"video-item__published-date\">").concat(video.date, "</p>\n            <button \n              data-video-id=\"").concat(video.id, "\" \n              data-thumbnail=\"").concat(video.thumbnail, "\"\n              data-title=\"").concat(video.title, "\"\n              data-channelTitle=\"").concat(video.channelTitle, "\"\n              data-date=\"").concat(video.date, "\"\n              class=\"video-item__save-button button ").concat(video.saved ? 'saved' : '', "\">\u2B07 \uC800\uC7A5</button>\n          </li>");
  }), _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__._.join(''), function (html) {
    return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(_this2, _$firstSkeleton).insertAdjacentHTML('beforebegin', html);
  });
}

function _controllScreen2(order) {
  (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$emptyScreen).classList[order]('empty');
}

function _lastVideoItem2() {
  return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).childNodes[(0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container).childNodes.length - _constants_index_js__WEBPACK_IMPORTED_MODULE_6__.YOUTUBE_API_REQUEST_COUNT - 1];
}

function _initializeFirstSkeleton2() {
  var _this3 = this;

  _utils_fx_js__WEBPACK_IMPORTED_MODULE_7__._.go("<div class=\"skeleton\">\n        <div class=\"image\"></div>\n        <p class=\"line\"></p>\n        <p class=\"line\"></p>\n      </div>".repeat(_constants_index_js__WEBPACK_IMPORTED_MODULE_6__.YOUTUBE_API_REQUEST_COUNT), function (skeletonsHTML) {
    return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(_this3, _$container).insertAdjacentHTML('beforeend', skeletonsHTML);
  });

  (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _$firstSkeleton, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.$)('.skeleton', (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _$container)));
}



/***/ }),

/***/ "./src/js/YoutubeAPI/index.js":
/*!************************************!*\
  !*** ./src/js/YoutubeAPI/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_fx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fx.js */ "./src/js/utils/fx.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ "./src/js/utils/index.js");
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/index.js */ "./src/js/constants/index.js");



var PRIVATE_VARIABLE = {
  nextPageToken: '',
  keyword: ''
};

var makeParameters = function makeParameters() {
  return new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.YOUTUBE_API_REQUEST_COUNT,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: PRIVATE_VARIABLE.nextPageToken,
    q: PRIVATE_VARIABLE.keyword
  });
};

var makeURL = function makeURL(host) {
  var url = new URL(host);
  url.search = makeParameters().toString();
  return url;
};

var checkEndPage = function checkEndPage() {
  return PRIVATE_VARIABLE.nextPageToken === undefined;
};

var YoutubeAPI = {
  getVideos: function getVideos(host) {
    if (checkEndPage()) return [];
    return _utils_fx_js__WEBPACK_IMPORTED_MODULE_0__._.go(host, makeURL, _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.fetchByGet, function (response) {
      return response.ok ? response.json() : Promise.reject(new Error());
    }, function (body) {
      PRIVATE_VARIABLE.nextPageToken = body.nextPageToken;
      return body.items;
    });
  },
  readyToFetch: function readyToFetch(keyword) {
    PRIVATE_VARIABLE.nextPageToken = '';
    PRIVATE_VARIABLE.keyword = keyword;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YoutubeAPI);

/***/ }),

/***/ "./src/js/constants/index.js":
/*!***********************************!*\
  !*** ./src/js/constants/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONFIRM_DELETE_MESSAGE": () => (/* binding */ CONFIRM_DELETE_MESSAGE),
/* harmony export */   "DATABASE_VIDEO_KEY": () => (/* binding */ DATABASE_VIDEO_KEY),
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE),
/* harmony export */   "MAX_DATABASE_CAPACITY": () => (/* binding */ MAX_DATABASE_CAPACITY),
/* harmony export */   "REDIRECT_SERVER_HOST": () => (/* binding */ REDIRECT_SERVER_HOST),
/* harmony export */   "SELECTOR": () => (/* binding */ SELECTOR),
/* harmony export */   "YOUTUBE_API_REQUEST_COUNT": () => (/* binding */ YOUTUBE_API_REQUEST_COUNT)
/* harmony export */ });
var YOUTUBE_API_REQUEST_COUNT = 10;
var MAX_DATABASE_CAPACITY = 100;
var SELECTOR = {
  SEARCH_MODAL_BUTTON: '#search-modal-button',
  SEARCH_MODAL: '#search-modal',
  MODAL_BACKGROUND: '#modal-background',
  SEARCH_FORM: '#search-form',
  SEARCH_INPUT_KEYWORD: '#search-input-keyword',
  VIDEOS: '#videos',
  EMPTY_SCREEN: '#empty-screen',
  APP: '#app',
  SEEN_BUTTON: '#seen-button',
  SEEN_EMPTY_SCREEN: '#seen-empty-sceen',
  SEEN_VIDEOS: '#seen-videos',
  UNSEEN_BUTTON: '#unseen-button',
  UNSEEN_EMPTY_SCREEN: '#unseen-empty-screen',
  UNSEEN_VIDEOS: '#unseen-videos'
};
var ERROR_MESSAGE = {
  EMPTY_KEYWORD: '검색어를 입력해주세요!',
  FULL_OF_DATABASE: "".concat(MAX_DATABASE_CAPACITY, "\uAC1C\uBCF4\uB2E4 \uB9CE\uC774 \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")
};
var CONFIRM_DELETE_MESSAGE = '정말 삭제하시겠습니까?';
var REDIRECT_SERVER_HOST = {
  REAL: 'https://sad-mcclintock-e1eeea.netlify.app/youtube/v3/search',
  DUMMY: 'https://sad-mcclintock-e1eeea.netlify.app/dummy/youtube/v3/search'
};
var DATABASE_VIDEO_KEY = 'videos';

/***/ }),

/***/ "./src/js/utils/fx.js":
/*!****************************!*\
  !*** ./src/js/utils/fx.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ L),
/* harmony export */   "_": () => (/* binding */ _)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);


var _ = {};
_.nop = Symbol('nop');

_.noop = function () {};

_.curry = function (f) {
  return function (a) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.length ? f.apply(void 0, [a].concat(args)) : function () {
      for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }

      return f.apply(void 0, [a].concat(args2));
    };
  };
};

_.isIterable = function (a) {
  return a && a[Symbol.iterator];
};

_.go1 = function (a, f) {
  return a instanceof Promise ? a.then(f) : f(a);
};

_.reduceF = function (acc, a, f) {
  return a instanceof Promise ? a.then(function (b) {
    return f(acc, b);
  }, function (e) {
    return e === _.nop ? acc : Promise.reject(e);
  }) : f(acc, a);
};

_.head = function (iterable) {
  return _.go1(_.take(1, iterable), function (_ref) {
    var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 1),
        h = _ref2[0];

    return h;
  });
};

_.reduce = _.curry(function (f, acc, iterable) {
  if (!iterable) return _.reduce(f, _.head(iterable = acc[Symbol.iterator]()), iterable);
  var iterator = iterable[Symbol.iterator]();
  return _.go1(acc, function recur(accum) {
    var cur;

    while (!(cur = iterator.next()).done) {
      accum = _.reduceF(accum, cur.value, f);
      if (accum instanceof Promise) return accum.then(recur);
    }

    return accum;
  });
});

_.go = function () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _.reduce(function (a, f) {
    return f(a);
  }, args);
};

_.pipe = function (f) {
  for (var _len4 = arguments.length, fs = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    fs[_key4 - 1] = arguments[_key4];
  }

  return function () {
    return _.go.apply(_, [f.apply(void 0, arguments)].concat(fs));
  };
};

_.take = _.curry(function (l, iterable) {
  var result = [];
  var iterator = iterable[Symbol.iterator]();
  return function recur() {
    var cur;

    while (!(cur = iterator.next()).done) {
      var a = cur.value;

      if (a instanceof Promise) {
        return a.then(function (b) {
          return (result.push(b), result).length === l ? result : recur();
        })["catch"](function (e) {
          return e === _.nop ? recur() : Promise.reject(e);
        });
      }

      if ((result.push(a), result).length === l) return result;
    }

    return result;
  }();
});
_.takeAll = _.take(Infinity);
var L = {};
L.range = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(l) {
  var i;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = -1;

        case 1:
          if (!(i += l > 1)) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
});
L.map = _.curry( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(f, iterable) {
  var iterator, cur;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          iterator = iterable[Symbol.iterator]();

        case 1:
          if ((cur = iterator.next()).done) {
            _context2.next = 6;
            break;
          }

          _context2.next = 4;
          return _.go1(cur.value, f);

        case 4:
          _context2.next = 1;
          break;

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}));
L.filter = _.curry( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(f, iterable) {
  var iterator, cur, _loop;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          iterator = iterable[Symbol.iterator]();
          _loop = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _loop() {
            var a;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _loop$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    a = _.go1(cur.value, f);

                    if (!(a instanceof Promise)) {
                      _context3.next = 6;
                      break;
                    }

                    _context3.next = 4;
                    return a.then(function (b) {
                      return b ? a : Promise.reject(_.nop);
                    });

                  case 4:
                    _context3.next = 9;
                    break;

                  case 6:
                    if (!a) {
                      _context3.next = 9;
                      break;
                    }

                    _context3.next = 9;
                    return cur.value;

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _loop);
          });

        case 2:
          if ((cur = iterator.next()).done) {
            _context4.next = 6;
            break;
          }

          return _context4.delegateYield(_loop(), "t0", 4);

        case 4:
          _context4.next = 2;
          break;

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee3);
}));
L.flatten = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function f(iterable) {
  var iterator, cur, a;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function f$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          iterator = iterable[Symbol.iterator]();

        case 1:
          if ((cur = iterator.next()).done) {
            _context5.next = 11;
            break;
          }

          a = cur.value;

          if (!(_.isIterable(a) && typeof a !== 'string')) {
            _context5.next = 7;
            break;
          }

          return _context5.delegateYield(f(a), "t0", 5);

        case 5:
          _context5.next = 9;
          break;

        case 7:
          _context5.next = 9;
          return a;

        case 9:
          _context5.next = 1;
          break;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, f);
});
L.flatMap = _.curry(_.pipe(L.map, L.flatten));
_.map = _.curry(_.pipe(L.map, _.takeAll));
_.filter = _.curry(_.pipe(L.filter, _.takeAll));
_.find = _.curry(_.pipe(L.filter, _.take(1), function (_ref3) {
  var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, 1),
      a = _ref4[0];

  return a;
}));
_.flatten = _.pipe(L.flatten, _.takeAll);
_.flatMap = _.curry(_.pipe(L.map, _.flatten));

_.add = function (a, b) {
  return a + b;
};

_.sum = _.reduce(_.add);
_.join = _.curry(function () {
  var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ',';
  var iterable = arguments.length > 1 ? arguments[1] : undefined;
  return _.reduce(function (a, b) {
    return "".concat(a).concat(sep).concat(b);
  }, iterable);
});
_.each = _.curry(function (f, iterable) {
  return _.map(function (a) {
    return _.go1(f(a), function () {
      return a;
    });
  }, iterable);
});
_.range = _.pipe(L.range, _.takeAll);

/***/ }),

/***/ "./src/js/utils/index.js":
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "fetchByGet": () => (/* binding */ fetchByGet),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "intersectionObserver": () => (/* binding */ intersectionObserver)
/* harmony export */ });
/* harmony import */ var _fx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fx.js */ "./src/js/utils/fx.js");

var formatDate = function formatDate(fullDate) {
  return fullDate.slice(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일');
};
var $ = function $(selector) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelector(selector);
};
var intersectionObserver = function intersectionObserver(lastItemOnInterSect) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ioCallback = function ioCallback(entries, io) {
    return _fx_js__WEBPACK_IMPORTED_MODULE_0__._.go(entries, _fx_js__WEBPACK_IMPORTED_MODULE_0__._.filter(function (entry) {
      return entry.isIntersecting;
    }), _fx_js__WEBPACK_IMPORTED_MODULE_0__._.each(function (_ref) {
      var target = _ref.target;
      return io.unobserve(target);
    }), _fx_js__WEBPACK_IMPORTED_MODULE_0__._.each(_fx_js__WEBPACK_IMPORTED_MODULE_0__._.pipe(lastItemOnInterSect, function (lastItem) {
      if (lastItem) io.observe(lastItem);
    })));
  };

  return new IntersectionObserver(ioCallback, option);
};
var fetchByGet = function fetchByGet(url) {
  return fetch(url, {
    method: 'GET'
  });
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/app.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --button-color: #f5f5f5;\r\n  --button-hover-color: #ebebeb;\r\n  --switch-button-border-color: #f5f5f5;\r\n  --switch-button-active-color: #00bcd41f;\r\n  --video-item-checked-button-color: #00bcd41f;\r\n}\r\n\r\nbody {\r\n  padding: 64px 0;\r\n  font-size: 16px;\r\n}\r\n\r\n#app {\r\n  max-width: 1100px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n  text-align: center;\r\n  font-weight: bold;\r\n  font-size: 34px;\r\n  line-height: 36px;\r\n  margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 48px;\r\n}\r\n\r\n.button {\r\n  cursor: pointer;\r\n  border-radius: 4px;\r\n  border: none;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  font-size: 14px;\r\n  letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n  padding: 7px 15px;\r\n  background: var(--button-color);\r\n}\r\n\r\n.nav__button-wrap {\r\n  display: flex;\r\n}\r\n\r\n.switch-button {\r\n  border: 1px solid var(--switch-button-border-color);\r\n}\r\n\r\n.switch-button[data-tab='unseen'] {\r\n  border-radius: 4px 0 0 4px;\r\n  border-right: none;\r\n}\r\n\r\n.switch-button[data-tab='seen'] {\r\n  border-radius: 0 4px 4px 0;\r\n}\r\n\r\n.classroom-container.unseen .switch-button[data-tab='unseen'],\r\n.classroom-container.seen .switch-button[data-tab='seen'] {\r\n  background-color: var(--switch-button-active-color);\r\n}\r\n\r\n.classroom-container .save-video-list,\r\n.no-result.empty + .video-list,\r\n.save-video-list .no-result {\r\n  display: none;\r\n}\r\n\r\n.classroom-container.unseen .save-video-list.unseen,\r\n.classroom-container.seen .save-video-list.seen {\r\n  display: block;\r\n}\r\n\r\n.save-video-list {\r\n  width: 100%;\r\n  height: 493px;\r\n}\r\n\r\n.no-result.empty {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.no-result__message {\r\n  font-size: 25px;\r\n}\r\n\r\n.video-item__button-wrap {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.video-item__button-wrap .button {\r\n  width: 36px;\r\n  height: 36px;\r\n  background-color: var(--button-color);\r\n}\r\n\r\n.nav__button:hover,\r\n.video-item__delete-button:hover {\r\n  background-color: var(--button-hover-color);\r\n}\r\n\r\n.switch-button:hover {\r\n  background-color: var(--switch-button-active-color);\r\n}\r\n\r\n.video-item__check-button:hover {\r\n  background-color: var(--video-item-checked-button-color);\r\n}\r\n\r\n.video-item__check-button {\r\n  margin-right: 8px;\r\n}\r\n\r\n.video-item__check-button.active {\r\n  background-color: var(--video-item-checked-button-color);\r\n}\r\n\r\n@media only screen and (max-width: 1279px) {\r\n  #app {\r\n    max-width: 800px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 31px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 959px) {\r\n  #app {\r\n    max-width: 560px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 28px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 599px) {\r\n  #app {\r\n    max-width: 320px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 22px;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/app.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,6BAA6B;EAC7B,qCAAqC;EACrC,uCAAuC;EACvC,4CAA4C;AAC9C;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,+BAA+B;AACjC;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,mDAAmD;AACrD;;AAEA;EACE,0BAA0B;EAC1B,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;;EAEE,mDAAmD;AACrD;;AAEA;;;EAGE,aAAa;AACf;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,qCAAqC;AACvC;;AAEA;;EAEE,2CAA2C;AAC7C;;AAEA;EACE,mDAAmD;AACrD;;AAEA;EACE,wDAAwD;AAC1D;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,wDAAwD;AAC1D;;AAEA;EACE;IACE,gBAAgB;EAClB;;EAEA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,gBAAgB;EAClB;;EAEA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,gBAAgB;EAClB;;EAEA;IACE,eAAe;EACjB;AACF","sourcesContent":[":root {\r\n  --button-color: #f5f5f5;\r\n  --button-hover-color: #ebebeb;\r\n  --switch-button-border-color: #f5f5f5;\r\n  --switch-button-active-color: #00bcd41f;\r\n  --video-item-checked-button-color: #00bcd41f;\r\n}\r\n\r\nbody {\r\n  padding: 64px 0;\r\n  font-size: 16px;\r\n}\r\n\r\n#app {\r\n  max-width: 1100px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n  text-align: center;\r\n  font-weight: bold;\r\n  font-size: 34px;\r\n  line-height: 36px;\r\n  margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 48px;\r\n}\r\n\r\n.button {\r\n  cursor: pointer;\r\n  border-radius: 4px;\r\n  border: none;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n  font-size: 14px;\r\n  letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n  padding: 7px 15px;\r\n  background: var(--button-color);\r\n}\r\n\r\n.nav__button-wrap {\r\n  display: flex;\r\n}\r\n\r\n.switch-button {\r\n  border: 1px solid var(--switch-button-border-color);\r\n}\r\n\r\n.switch-button[data-tab='unseen'] {\r\n  border-radius: 4px 0 0 4px;\r\n  border-right: none;\r\n}\r\n\r\n.switch-button[data-tab='seen'] {\r\n  border-radius: 0 4px 4px 0;\r\n}\r\n\r\n.classroom-container.unseen .switch-button[data-tab='unseen'],\r\n.classroom-container.seen .switch-button[data-tab='seen'] {\r\n  background-color: var(--switch-button-active-color);\r\n}\r\n\r\n.classroom-container .save-video-list,\r\n.no-result.empty + .video-list,\r\n.save-video-list .no-result {\r\n  display: none;\r\n}\r\n\r\n.classroom-container.unseen .save-video-list.unseen,\r\n.classroom-container.seen .save-video-list.seen {\r\n  display: block;\r\n}\r\n\r\n.save-video-list {\r\n  width: 100%;\r\n  height: 493px;\r\n}\r\n\r\n.no-result.empty {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.no-result__message {\r\n  font-size: 25px;\r\n}\r\n\r\n.video-item__button-wrap {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.video-item__button-wrap .button {\r\n  width: 36px;\r\n  height: 36px;\r\n  background-color: var(--button-color);\r\n}\r\n\r\n.nav__button:hover,\r\n.video-item__delete-button:hover {\r\n  background-color: var(--button-hover-color);\r\n}\r\n\r\n.switch-button:hover {\r\n  background-color: var(--switch-button-active-color);\r\n}\r\n\r\n.video-item__check-button:hover {\r\n  background-color: var(--video-item-checked-button-color);\r\n}\r\n\r\n.video-item__check-button {\r\n  margin-right: 8px;\r\n}\r\n\r\n.video-item__check-button.active {\r\n  background-color: var(--video-item-checked-button-color);\r\n}\r\n\r\n@media only screen and (max-width: 1279px) {\r\n  #app {\r\n    max-width: 800px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 31px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 959px) {\r\n  #app {\r\n    max-width: 560px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 28px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 599px) {\r\n  #app {\r\n    max-width: 320px;\r\n  }\r\n\r\n  .classroom-container__title {\r\n    font-size: 22px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./modal.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_skeleton_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./skeleton.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/skeleton.css");
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_skeleton_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAIA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,mCAAmC;AACvC;;AAEA;IACI,aAAa;AACjB","sourcesContent":["@import './app.css';\r\n@import './modal.css';\r\n@import './skeleton.css';\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/modal.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --dimmer-color: rgba(0, 0, 0, 0.5);\r\n  --modal-border-color: rgba(0, 0, 0, 0.12);\r\n  --search-input-border-color: #b4b4b4;\r\n  --search-input-placeholder-color: #8b8b8b;\r\n  --search-button-color: #00bcd4;\r\n  --search-button-font-color: #ffffff;\r\n  --video-save-button-color: #f9f9f9;\r\n  --video-save-button-hover-color: #efefef;\r\n}\r\n\r\n.modal-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.search-result.search-result--no-result,\r\n.search-result.search-result--no-result.empty + .search-result,\r\n.modal-container.hide {\r\n  display: none;\r\n}\r\n\r\n.search-result.search-result--no-result.empty {\r\n  display: flex;\r\n}\r\n\r\n.dimmer {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: var(--dimmer-color);\r\n}\r\n\r\n.search-modal {\r\n  position: relative;\r\n  width: 97%;\r\n  height: 727px;\r\n  background: #ffffff;\r\n  border: 1px solid var(--modal-border-color);\r\n  border-radius: 4px;\r\n  padding: 50px 30px 32px 30px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.search-modal__title {\r\n  font-weight: bold;\r\n  font-size: 34px;\r\n  line-height: 36px;\r\n  text-align: center;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.search-input__keyword {\r\n  width: 400px;\r\n  height: 36px;\r\n  margin-right: 20px;\r\n  padding: 4px 8px;\r\n  border: 1px solid var(--search-input-border-color);\r\n  border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n  color: var(--search-input-placeholder-color);\r\n  font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n  width: 72px;\r\n  height: 36px;\r\n  background: var(--search-button-color);\r\n  color: var(--search-button-font-color);\r\n}\r\n\r\n.search-result {\r\n  height: 493px;\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: calc(100% - 202px);\r\n}\r\n\r\n.no-result__image {\r\n  width: 190px;\r\n  height: 140px;\r\n  margin-bottom: 32px;\r\n  display: block;\r\n}\r\n\r\n.no-result__description {\r\n  font-size: 16px;\r\n  line-height: 150%;\r\n  text-align: center;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  gap: 32px 20px;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.video-list .skeleton {\r\n  display: none;\r\n}\r\n\r\n.video-list.loading .skeleton {\r\n  display: block;\r\n}\r\n\r\n.video-item {\r\n  position: relative;\r\n  width: 240px;\r\n  height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n  width: 100%;\r\n  height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n  font-weight: bold;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n  font-size: 12px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n  position: absolute;\r\n  right: 0;\r\n  width: 80px;\r\n  height: 36px;\r\n  background: var(--video-save-button-color);\r\n  margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n  background: var(--video-save-button-hover-color);\r\n}\r\n\r\n.video-item__save-button.saved {\r\n  display: none;\r\n}\r\n\r\n@media only screen and (max-width: 1279px) {\r\n  .search-modal__title {\r\n    font-size: 31px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 959px) {\r\n  .search-modal__title {\r\n    font-size: 28px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 599px) {\r\n  .search-modal__title {\r\n    font-size: 22px;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/modal.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,yCAAyC;EACzC,oCAAoC;EACpC,yCAAyC;EACzC,8BAA8B;EAC9B,mCAAmC;EACnC,kCAAkC;EAClC,wCAAwC;AAC1C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,MAAM;EACN,OAAO;AACT;;AAEA;;;EAGE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,+BAA+B;AACjC;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,2CAA2C;EAC3C,kBAAkB;EAClB,4BAA4B;EAC5B,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;EAChB,kDAAkD;EAClD,kBAAkB;AACpB;;AAEA;EACE,4CAA4C;EAC5C,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sCAAsC;EACtC,sCAAsC;AACxC;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,uBAAuB;EACvB,mBAAmB;EACnB,0BAA0B;AAC5B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,YAAY;EACZ,0CAA0C;EAC1C,eAAe;AACjB;;AAEA;EACE,gDAAgD;AAClD;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;AACF","sourcesContent":[":root {\r\n  --dimmer-color: rgba(0, 0, 0, 0.5);\r\n  --modal-border-color: rgba(0, 0, 0, 0.12);\r\n  --search-input-border-color: #b4b4b4;\r\n  --search-input-placeholder-color: #8b8b8b;\r\n  --search-button-color: #00bcd4;\r\n  --search-button-font-color: #ffffff;\r\n  --video-save-button-color: #f9f9f9;\r\n  --video-save-button-hover-color: #efefef;\r\n}\r\n\r\n.modal-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.search-result.search-result--no-result,\r\n.search-result.search-result--no-result.empty + .search-result,\r\n.modal-container.hide {\r\n  display: none;\r\n}\r\n\r\n.search-result.search-result--no-result.empty {\r\n  display: flex;\r\n}\r\n\r\n.dimmer {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: var(--dimmer-color);\r\n}\r\n\r\n.search-modal {\r\n  position: relative;\r\n  width: 97%;\r\n  height: 727px;\r\n  background: #ffffff;\r\n  border: 1px solid var(--modal-border-color);\r\n  border-radius: 4px;\r\n  padding: 50px 30px 32px 30px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.search-modal__title {\r\n  font-weight: bold;\r\n  font-size: 34px;\r\n  line-height: 36px;\r\n  text-align: center;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.search-input__keyword {\r\n  width: 400px;\r\n  height: 36px;\r\n  margin-right: 20px;\r\n  padding: 4px 8px;\r\n  border: 1px solid var(--search-input-border-color);\r\n  border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n  color: var(--search-input-placeholder-color);\r\n  font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n  width: 72px;\r\n  height: 36px;\r\n  background: var(--search-button-color);\r\n  color: var(--search-button-font-color);\r\n}\r\n\r\n.search-result {\r\n  height: 493px;\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: calc(100% - 202px);\r\n}\r\n\r\n.no-result__image {\r\n  width: 190px;\r\n  height: 140px;\r\n  margin-bottom: 32px;\r\n  display: block;\r\n}\r\n\r\n.no-result__description {\r\n  font-size: 16px;\r\n  line-height: 150%;\r\n  text-align: center;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  gap: 32px 20px;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.video-list .skeleton {\r\n  display: none;\r\n}\r\n\r\n.video-list.loading .skeleton {\r\n  display: block;\r\n}\r\n\r\n.video-item {\r\n  position: relative;\r\n  width: 240px;\r\n  height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n  width: 100%;\r\n  height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n  font-weight: bold;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n  font-size: 12px;\r\n  line-height: 24px;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n  position: absolute;\r\n  right: 0;\r\n  width: 80px;\r\n  height: 36px;\r\n  background: var(--video-save-button-color);\r\n  margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n  background: var(--video-save-button-hover-color);\r\n}\r\n\r\n.video-item__save-button.saved {\r\n  display: none;\r\n}\r\n\r\n@media only screen and (max-width: 1279px) {\r\n  .search-modal__title {\r\n    font-size: 31px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 959px) {\r\n  .search-modal__title {\r\n    font-size: 28px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 599px) {\r\n  .search-modal__title {\r\n    font-size: 22px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/skeleton.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/skeleton.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skeleton {\r\n  width: 236px;\r\n}\r\n\r\n.skeleton .image,\r\n.skeleton .line {\r\n  background-image: linear-gradient(\r\n    90deg,\r\n    #e0e0e0 0px,\r\n    #ededed 30px,\r\n    #e0e0e0 60px\r\n  );\r\n  animation: refresh 2s infinite ease-out;\r\n}\r\n\r\n.skeleton .image {\r\n  height: 150px;\r\n}\r\n\r\n.skeleton .line {\r\n  height: 16px;\r\n  margin-top: 5px;\r\n}\r\n\r\n.skeleton .line:last-child {\r\n  width: 80%;\r\n}\r\n\r\n@keyframes refresh {\r\n  0% {\r\n    background-position: calc(-100px);\r\n  }\r\n  40%,\r\n  100% {\r\n    background-position: 320px;\r\n  }\r\n}", "",{"version":3,"sources":["webpack://./src/css/skeleton.css"],"names":[],"mappings":"AAAA;EACE,YAAY;AACd;;AAEA;;EAEE;;;;;GAKC;EACD,uCAAuC;AACzC;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE;IACE,iCAAiC;EACnC;EACA;;IAEE,0BAA0B;EAC5B;AACF","sourcesContent":[".skeleton {\r\n  width: 236px;\r\n}\r\n\r\n.skeleton .image,\r\n.skeleton .line {\r\n  background-image: linear-gradient(\r\n    90deg,\r\n    #e0e0e0 0px,\r\n    #ededed 30px,\r\n    #e0e0e0 60px\r\n  );\r\n  animation: refresh 2s infinite ease-out;\r\n}\r\n\r\n.skeleton .image {\r\n  height: 150px;\r\n}\r\n\r\n.skeleton .line {\r\n  height: 16px;\r\n  margin-top: 5px;\r\n}\r\n\r\n.skeleton .line:last-child {\r\n  width: 80%;\r\n}\r\n\r\n@keyframes refresh {\r\n  0% {\r\n    background-position: calc(-100px);\r\n  }\r\n  40%,\r\n  100% {\r\n    background-position: 320px;\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorGet)
/* harmony export */ });
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorSet)
/* harmony export */ });
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classExtractFieldDescriptor)
/* harmony export */ });
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldGet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorGet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "get");
  return (0,_classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldSet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorSet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "set");
  (0,_classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor, value);
  return value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index.css */ "./src/css/index.css");
/* harmony import */ var _js_Interactor_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Interactor/index.js */ "./src/js/Interactor/index.js");


(0,_js_Interactor_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map