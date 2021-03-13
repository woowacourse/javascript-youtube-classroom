// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/utils/DOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const $ = selector => document.querySelector(selector);

var _default = $;
exports.default = _default;
},{}],"src/js/constants/API.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YOUTUBE_QUERY = exports.YOUTUBE_BASE_URL = void 0;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
exports.YOUTUBE_BASE_URL = YOUTUBE_BASE_URL;
const YOUTUBE_QUERY = {
  PART: {
    SNIPPET: 'snippet'
  },
  ORDER: {
    VIEWCOUNT: 'viewCount'
  }
};
exports.YOUTUBE_QUERY = YOUTUBE_QUERY;
},{}],"src/js/constants/classroom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAN_CHARACTER = exports.FETCH_VIDEO_COUNT = exports.MAX_LATEST_KEYWORD_COUNT = exports.MAX_SAVED_VIDEO_COUNT = void 0;
const MAX_SAVED_VIDEO_COUNT = 100;
exports.MAX_SAVED_VIDEO_COUNT = MAX_SAVED_VIDEO_COUNT;
const MAX_LATEST_KEYWORD_COUNT = 3;
exports.MAX_LATEST_KEYWORD_COUNT = MAX_LATEST_KEYWORD_COUNT;
const FETCH_VIDEO_COUNT = 10;
exports.FETCH_VIDEO_COUNT = FETCH_VIDEO_COUNT;
const NAN_CHARACTER = '-';
exports.NAN_CHARACTER = NAN_CHARACTER;
},{}],"src/js/utils/queryString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryString = getQueryString;

function getQueryString(query = {}) {
  return Object.entries(query).map(([key, value]) => value instanceof Array ? `${key}=${value.join(',')}` : `${key}=${value}`).join('&');
}
},{}],"src/js/API.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSearchResult = fetchSearchResult;
exports.fetchLatestVideoInfos = fetchLatestVideoInfos;

var _API = require("./constants/API.js");

var _classroom = require("./constants/classroom.js");

var _queryString = require("./utils/queryString.js");

function fetchSearchResult(keyword = '', nextPageToken = '') {
  const query = {
    part: _API.YOUTUBE_QUERY.PART.SNIPPET,
    order: _API.YOUTUBE_QUERY.ORDER.VIEW_COUNT,
    maxResults: _classroom.FETCH_VIDEO_COUNT,
    key: "AIzaSyDSu3YG4AM7jnpXoYY5q8-a6KAPao2dpnY" ?? '',
    pageToken: nextPageToken,
    q: keyword
  };
  const queryString = (0, _queryString.getQueryString)(query);
  return fetch(`${_API.YOUTUBE_BASE_URL}/search?${queryString}`).then(data => data.json()).catch(e => console.error(e));
}

function fetchLatestVideoInfos(videoIds = []) {
  const query = {
    part: _API.YOUTUBE_QUERY.PART.SNIPPET,
    id: videoIds,
    key: "AIzaSyDSu3YG4AM7jnpXoYY5q8-a6KAPao2dpnY" ?? ''
  };
  const queryString = (0, _queryString.getQueryString)(query);
  return fetch(`${_API.YOUTUBE_BASE_URL}/videos?${queryString}`).then(data => data.json()).catch(e => console.error(e));
}
},{"./constants/API.js":"src/js/constants/API.js","./constants/classroom.js":"src/js/constants/classroom.js","./utils/queryString.js":"src/js/utils/queryString.js"}],"src/js/states/pageToken.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const pageToken = {
  value: '',

  get() {
    return this.value;
  },

  set(newToken) {
    this.value = newToken;
  }

};
var _default = pageToken;
exports.default = _default;
},{}],"src/js/constants/localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_INFOS = exports.LATEST_KEYWORDS = void 0;
const LATEST_KEYWORDS = 'latestKeywords';
exports.LATEST_KEYWORDS = LATEST_KEYWORDS;
const VIDEO_INFOS = 'videoInfos';
exports.VIDEO_INFOS = VIDEO_INFOS;
},{}],"src/js/utils/localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalStorage = setLocalStorage;
exports.getLocalStorage = getLocalStorage;

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
},{}],"src/js/states/videoInfos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _API = require("../API.js");

var _localStorage = require("../constants/localStorage.js");

var _localStorage2 = require("../utils/localStorage.js");

async function updateVideoInfos(videoInfos) {
  const videoIds = videoInfos.map(videoInfo => videoInfo.id.videoId);
  const {
    items
  } = await (0, _API.fetchLatestVideoInfos)(videoIds);
  return items.map(({
    id,
    snippet
  }) => ({
    id: {
      videoId: id
    },
    snippet: {
      title: snippet.title,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      publishTime: snippet.publishedAt
    },
    isWatched: videoInfos.find(videoInfo => videoInfo.id.videoId === id).isWatched
  }));
}

const videoInfos = {
  value: new Set(),

  async init() {
    const oldVideoInfos = (0, _localStorage2.getLocalStorage)(_localStorage.VIDEO_INFOS) ?? [];
    const latestVideoInfos = await updateVideoInfos(oldVideoInfos);
    this.set(latestVideoInfos);
  },

  add(newVideoInfo) {
    this.value.add(newVideoInfo);
    (0, _localStorage2.setLocalStorage)(_localStorage.VIDEO_INFOS, [...this.value]);
  },

  remove(targetId) {
    const newVideoInfos = [...this.value].filter(({
      id
    }) => id.videoId !== targetId);
    this.set(newVideoInfos);
  },

  set(newVideoInfos) {
    this.value = new Set(newVideoInfos);
    (0, _localStorage2.setLocalStorage)(_localStorage.VIDEO_INFOS, [...this.value]);
  },

  toggleWatchType(targetId) {
    const newVideoInfos = [...this.value].map(videoInfo => videoInfo.id.videoId === targetId ? { ...videoInfo,
      isWatched: !videoInfo.isWatched
    } : videoInfo);
    this.set(newVideoInfos);
  },

  get() {
    return this.value;
  },

  get size() {
    return this.value.size;
  }

};
var _default = videoInfos;
exports.default = _default;
},{"../API.js":"src/js/API.js","../constants/localStorage.js":"src/js/constants/localStorage.js","../utils/localStorage.js":"src/js/utils/localStorage.js"}],"src/js/service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveVideo = saveVideo;
exports.cancelVideoSave = cancelVideoSave;
exports.searchVideo = searchVideo;

var _API = require("./API.js");

var _pageToken = _interopRequireDefault(require("./states/pageToken.js"));

var _videoInfos = _interopRequireDefault(require("./states/videoInfos.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVideoInfo(videoDataset) {
  const {
    videoId,
    title,
    channelId,
    channelTitle,
    publishTime
  } = videoDataset;
  return {
    id: {
      videoId
    },
    snippet: {
      title,
      channelId,
      channelTitle,
      publishTime
    },
    isWatched: false
  };
}

function saveVideo($video) {
  const videoInfo = createVideoInfo($video.dataset);

  _videoInfos.default.add(videoInfo);
}

function cancelVideoSave($video) {
  const {
    videoId
  } = $video.dataset;

  _videoInfos.default.remove(videoId);
}

async function searchVideo(keyword) {
  const {
    nextPageToken,
    items
  } = await (0, _API.fetchSearchResult)(keyword);

  _pageToken.default.set(nextPageToken);

  return items.filter(item => item.id.videoId);
}
},{"./API.js":"src/js/API.js","./states/pageToken.js":"src/js/states/pageToken.js","./states/videoInfos.js":"src/js/states/videoInfos.js"}],"src/js/templates/keywordList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function keywordChipTemplate(keyword) {
  return `<span class="js-latest-keyword chip mx-1">${keyword}</span>`;
}

function keywordListTemplate(latestKeywords = []) {
  return `<span class="text-gray-700">최근 검색어: </span>
  ${latestKeywords.map(keyword => keywordChipTemplate(keyword)).reverse().join('')}`;
}

var _default = keywordListTemplate;
exports.default = _default;
},{}],"src/js/utils/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classroom = require("../constants/classroom.js");

function formatDate(dateString) {
  const d = new Date(dateString);

  const year = d.getFullYear() || _classroom.NAN_CHARACTER;

  const month = d.getMonth() || _classroom.NAN_CHARACTER;

  const date = d.getDate() || _classroom.NAN_CHARACTER;

  return `${year}년 ${month}월 ${date}일`;
}

var _default = formatDate;
exports.default = _default;
},{"../constants/classroom.js":"src/js/constants/classroom.js"}],"src/js/templates/videoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoListTemplate = videoListTemplate;
exports.savedVideoListTemplate = savedVideoListTemplate;
exports.emptyVideoListTemplate = void 0;

var _date = _interopRequireDefault(require("../utils/date.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoSnippetTemplate({
  id,
  snippet
}, buttonListTemplate) {
  return `<article class="clip js-video"
            data-video-id=${id.videoId}
            data-title=${encodeURIComponent(snippet.title)}
            data-channel-id=${snippet.channelId}
            data-channel-title=${encodeURIComponent(snippet.channelTitle)}
            data-publish-time=${snippet.publishTime}
          >
            <div class="preview-container">
              <iframe
                class="js-preview"
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${id.videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${decodeURIComponent(snippet.title)}</h3>
              <div>
                <a
                  href="https://www.youtube.com/channel/${snippet.channelId}"
                  target="_blank"
                  class="channel-name mt-1"
                >
                ${decodeURIComponent(snippet.channelTitle)}
                </a>
                <div class="meta">
                  <p>${(0, _date.default)(snippet.publishTime)}</p>
                </div>
                <div class="d-flex justify-end" >
                  ${buttonListTemplate}
                </div>
              </div>
            </div>
          </article>`;
}

function saveButtonTemplate(isSaved) {
  return isSaved ? `<button class="btn js-save-cancel-button"}>↪️ 저장 취소</button>` : `<button class="btn js-save-button"}>⬇️ 저장</button>`;
}

function isSavedVideo(item, videoInfos) {
  return [...videoInfos].some(videoInfo => videoInfo.id.videoId === item.id.videoId);
}

function videoListTemplate(resultItems = [], videoInfos) {
  return [...resultItems].map(item => videoSnippetTemplate(item, saveButtonTemplate(isSavedVideo(item, videoInfos)))).join('');
}

function controlButtonsTemplate(isWatched) {
  return [{
    content: '✅',
    className: 'js-watched-button',
    isChecked: isWatched
  }, {
    content: '👍',
    className: 'js-like-button',
    isChecked: false
  }, {
    content: '💬',
    className: 'js-comment-button',
    isChecked: false
  }, {
    content: '🗑️',
    className: 'js-delete-button',
    isChecked: false
  }].map(({
    content,
    className,
    isChecked
  }) => `<span class="${isChecked ? '' : 'opacity-hover'} ml-2 ${className}">
          ${content}
        </span>`).join('');
}

function savedVideoListTemplate(savedVideoInfos = []) {
  return [...savedVideoInfos].map(item => videoSnippetTemplate(item, controlButtonsTemplate(item.watchType))).join('');
}

const emptyVideoListTemplate = `<span id="empty-video-list" class="stretch text-center">영상이 없습니다. 😥</span>`;
exports.emptyVideoListTemplate = emptyVideoListTemplate;
},{"../utils/date.js":"src/js/utils/date.js"}],"src/js/templates/videoSkeleton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classroom = require("../constants/classroom.js");

function skeletonClipTemplate() {
  return `<article class="clip skeleton">
            <div class="preview-container image">
              <div ></div>
            </div>
            <div class="content-container pt-2">
              <div>
                <div class="meta line">
                  <p></p>
                </div>
                <div class="d-flex justify-end line mt-3"></div>
              </div>
            </div>
          </article>`;
}

function videoSkeletonTemplate() {
  return skeletonClipTemplate().repeat(_classroom.FETCH_VIDEO_COUNT);
}

var _default = videoSkeletonTemplate;
exports.default = _default;
},{"../constants/classroom.js":"src/js/constants/classroom.js"}],"src/js/templates/notFound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const notFoundTemplate = `
    <div id="video-not-found" class="stretch d-flex flex-col items-center">
      <img
        src="./src/images/status/not_found.png"
        width="100px"
        alt="not found"
      />
      <h2>검색결과가 없습니다.</h2>
      <div>다른 검색어를 시도해 보거나 검색 필터를 삭제하세요.</div>
    </div>
  `;
var _default = notFoundTemplate;
exports.default = _default;
},{}],"src/js/viewControllers/searchModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSavedVideoCount = renderSavedVideoCount;
exports.renderLatestKeywordList = renderLatestKeywordList;
exports.renderVideoLoader = renderVideoLoader;
exports.renderVideoSearchResult = renderVideoSearchResult;
exports.appendVideos = appendVideos;
exports.search = search;
exports.toggleSaveButton = toggleSaveButton;
exports.updateModalSaveButton = updateModalSaveButton;

var _DOM = _interopRequireDefault(require("../utils/DOM.js"));

var _classroom = require("../constants/classroom.js");

var _keywordList = _interopRequireDefault(require("../templates/keywordList.js"));

var _videoList = require("../templates/videoList.js");

var _videoSkeleton = _interopRequireDefault(require("../templates/videoSkeleton.js"));

var _notFound = _interopRequireDefault(require("../templates/notFound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $savedVideoCount = (0, _DOM.default)('#saved-video-count');
const $latestKeywordList = (0, _DOM.default)('#latest-keyword-list');
const $videoSearchResult = (0, _DOM.default)('#video-search-result');
const $videoSearchForm = (0, _DOM.default)('#video-search-form');

function renderSavedVideoCount(count) {
  $savedVideoCount.innerText = `${count} / ${_classroom.MAX_SAVED_VIDEO_COUNT}`;
}

function renderLatestKeywordList(latestKeywords) {
  $latestKeywordList.innerHTML = (0, _keywordList.default)(latestKeywords);
}

function renderVideoLoader() {
  $videoSearchResult.innerHTML = (0, _videoSkeleton.default)();
}

function renderVideoSearchResult(resultItems, videoInfos) {
  $videoSearchResult.innerHTML = resultItems.length ? (0, _videoList.videoListTemplate)(resultItems, videoInfos) : _notFound.default;
}

function appendVideos(searchResult, videoInfos) {
  $videoSearchResult.innerHTML += (0, _videoList.videoListTemplate)(searchResult, videoInfos);
}

function search(keyword) {
  $videoSearchForm.elements['video-search-input'].value = keyword;
  $videoSearchForm.elements['video-search-submit'].click();
}

function toggleSaveButton($saveButton) {
  if ($saveButton.classList.contains('js-save-button')) {
    $saveButton.innerText = '↪️ 저장 취소';
    $saveButton.classList.remove('js-save-button');
    $saveButton.classList.add('js-save-cancel-button');
  } else {
    $saveButton.innerText = '⬇️ 저장';
    $saveButton.classList.remove('js-save-cancel-button');
    $saveButton.classList.add('js-save-button');
  }
}

function updateModalSaveButton(videoId) {
  const $targetSaveButton = (0, _DOM.default)(`[data-video-id=${videoId}] .js-save-cancel-button`);
  toggleSaveButton($targetSaveButton);
}
},{"../utils/DOM.js":"src/js/utils/DOM.js","../constants/classroom.js":"src/js/constants/classroom.js","../templates/keywordList.js":"src/js/templates/keywordList.js","../templates/videoList.js":"src/js/templates/videoList.js","../templates/videoSkeleton.js":"src/js/templates/videoSkeleton.js","../templates/notFound.js":"src/js/templates/notFound.js"}],"src/js/states/latestKeywords.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classroom = require("../constants/classroom.js");

var _localStorage = require("../constants/localStorage.js");

var _localStorage2 = require("../utils/localStorage.js");

const latestKeywords = {
  value: [],

  init() {
    this.set((0, _localStorage2.getLocalStorage)(_localStorage.LATEST_KEYWORDS) ?? []);
  },

  get() {
    return this.value;
  },

  get length() {
    return this.value.length;
  },

  set(newKeywords) {
    this.value = newKeywords;
  },

  add(newKeyword) {
    const targetIdx = this.value.indexOf(newKeyword);

    if (targetIdx >= 0) {
      this.value.splice(targetIdx, 1);
    }

    if (this.value.length === _classroom.MAX_LATEST_KEYWORD_COUNT) {
      this.value.shift();
    }

    this.value.push(newKeyword);
    (0, _localStorage2.setLocalStorage)(_localStorage.LATEST_KEYWORDS, this.value ?? []);
  }

};
var _default = latestKeywords;
exports.default = _default;
},{"../constants/classroom.js":"src/js/constants/classroom.js","../constants/localStorage.js":"src/js/constants/localStorage.js","../utils/localStorage.js":"src/js/utils/localStorage.js"}],"src/js/handlers/moreVideoLoading.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _API = require("../API.js");

var _searchModal = require("../viewControllers/searchModal.js");

var _DOM = _interopRequireDefault(require("../utils/DOM.js"));

var _latestKeywords = _interopRequireDefault(require("../states/latestKeywords.js"));

var _videoInfos = _interopRequireDefault(require("../states/videoInfos.js"));

var _pageToken = _interopRequireDefault(require("../states/pageToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handleMoreVideoLoading(entries) {
  const [$lastVideo] = entries;
  const intersectionObserver = this;
  if (!$lastVideo.isIntersecting) return;
  intersectionObserver.disconnect();
  const {
    nextPageToken,
    items
  } = await (0, _API.fetchSearchResult)(_latestKeywords.default.get()[_latestKeywords.default.length - 1], _pageToken.default.get());

  _pageToken.default.set(nextPageToken);

  (0, _searchModal.appendVideos)(items, _videoInfos.default.get());
  const $newLastVideo = (0, _DOM.default)('#video-search-result .js-video:last-child');
  intersectionObserver.observe($newLastVideo);
}

var _default = handleMoreVideoLoading;
exports.default = _default;
},{"../API.js":"src/js/API.js","../viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js","../utils/DOM.js":"src/js/utils/DOM.js","../states/latestKeywords.js":"src/js/states/latestKeywords.js","../states/videoInfos.js":"src/js/states/videoInfos.js","../states/pageToken.js":"src/js/states/pageToken.js"}],"src/js/states/intersectionObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moreVideoLoading = _interopRequireDefault(require("../handlers/moreVideoLoading.js"));

var _DOM = _interopRequireDefault(require("../utils/DOM.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const intersectionObserver = {
  value: {},

  init() {
    const options = {
      root: (0, _DOM.default)('.modal-inner'),
      rootMargin: '0px',
      threshold: 0.85
    };
    const observer = new IntersectionObserver(_moreVideoLoading.default.bind(this), options);
    this.set(observer);
  },

  set(observer) {
    this.value = observer;
  },

  get() {
    return this.value;
  },

  disconnect() {
    this.value.disconnect();
  },

  observe($target) {
    this.value.observe($target);
  }

};
var _default = intersectionObserver;
exports.default = _default;
},{"../handlers/moreVideoLoading.js":"src/js/handlers/moreVideoLoading.js","../utils/DOM.js":"src/js/utils/DOM.js"}],"src/js/handlers/videoSearch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = require("../service.js");

var _intersectionObserver = _interopRequireDefault(require("../states/intersectionObserver.js"));

var _latestKeywords = _interopRequireDefault(require("../states/latestKeywords.js"));

var _videoInfos = _interopRequireDefault(require("../states/videoInfos.js"));

var _DOM = _interopRequireDefault(require("../utils/DOM.js"));

var _searchModal = require("../viewControllers/searchModal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initInfiniteScroll() {
  const $lastVideo = (0, _DOM.default)('#video-search-result .js-video:last-child');

  _intersectionObserver.default.disconnect();

  _intersectionObserver.default.observe($lastVideo);
}

async function handleVideoSearch(e) {
  e.preventDefault();
  const keyword = e.target.elements['video-search-input'].value;

  _latestKeywords.default.add(keyword);

  (0, _searchModal.renderLatestKeywordList)(_latestKeywords.default.get());
  (0, _searchModal.renderVideoLoader)();
  const resultItems = await (0, _service.searchVideo)(keyword);
  (0, _searchModal.renderVideoSearchResult)(resultItems, _videoInfos.default.get());

  if (resultItems.length) {
    initInfiniteScroll();
  }
}

var _default = handleVideoSearch;
exports.default = _default;
},{"../service.js":"src/js/service.js","../states/intersectionObserver.js":"src/js/states/intersectionObserver.js","../states/latestKeywords.js":"src/js/states/latestKeywords.js","../states/videoInfos.js":"src/js/states/videoInfos.js","../utils/DOM.js":"src/js/utils/DOM.js","../viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js"}],"src/js/constants/snackbarMessage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_MOVE_SUCCESS_MSG = exports.SAVE_DELETE_SUCCESS_MSG = exports.SAVE_CANCEL_SUCCESS_MSG = exports.SAVE_SUCCESS_MSG = exports.EXCEED_SAVED_VIDEO_COUNT_MSG = void 0;
const SAVE_SUCCESS_MSG = '성공적으로 저장하였습니다.';
exports.SAVE_SUCCESS_MSG = SAVE_SUCCESS_MSG;
const SAVE_CANCEL_SUCCESS_MSG = '저장을 취소하였습니다.';
exports.SAVE_CANCEL_SUCCESS_MSG = SAVE_CANCEL_SUCCESS_MSG;
const SAVE_DELETE_SUCCESS_MSG = '해당 영상을 삭제하였습니다.';
exports.SAVE_DELETE_SUCCESS_MSG = SAVE_DELETE_SUCCESS_MSG;
const EXCEED_SAVED_VIDEO_COUNT_MSG = '최대 저장 개수를 초과했습니다. 기존에 저장된 영상을 삭제하고 다시 시도해주세요.';
exports.EXCEED_SAVED_VIDEO_COUNT_MSG = EXCEED_SAVED_VIDEO_COUNT_MSG;
const VIDEO_MOVE_SUCCESS_MSG = '영상을 이동시켰습니다.';
exports.VIDEO_MOVE_SUCCESS_MSG = VIDEO_MOVE_SUCCESS_MSG;
},{}],"src/js/constants/filterType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WATCHED_TYPE = exports.TO_WATCH_TYPE = void 0;
const TO_WATCH_TYPE = 'toWatch';
exports.TO_WATCH_TYPE = TO_WATCH_TYPE;
const WATCHED_TYPE = 'watched';
exports.WATCHED_TYPE = WATCHED_TYPE;
},{}],"src/js/viewControllers/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModal = openModal;
exports.closeModal = closeModal;
exports.renderSavedVideoList = renderSavedVideoList;
exports.showSnackBar = showSnackBar;
exports.toggleFocusedModeButton = toggleFocusedModeButton;

var _DOM = _interopRequireDefault(require("../utils/DOM.js"));

var _videoList = require("../templates/videoList.js");

var _filterType = require("../constants/filterType.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $searchModal = (0, _DOM.default)('#video-search-modal');
const $videoList = (0, _DOM.default)('#video-list');
const $videoSearchInput = (0, _DOM.default)('#video-search-input');

function openModal() {
  $searchModal.classList.add('open');
  $videoSearchInput.focus();
}

function closeModal() {
  $searchModal.classList.remove('open');
}

function renderSavedVideoList(videoInfos, videoListType) {
  const filteredVideoInfos = videoListType === _filterType.TO_WATCH_TYPE ? [...videoInfos].filter(videoInfo => !videoInfo.isWatched) : [...videoInfos].filter(videoInfo => videoInfo.isWatched);
  $videoList.innerHTML = filteredVideoInfos.length ? (0, _videoList.savedVideoListTemplate)(filteredVideoInfos) : _videoList.emptyVideoListTemplate;
}

function showSnackBar(contents) {
  const $snackbar = (0, _DOM.default)('#snack-bar');
  $snackbar.innerText = contents;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
}

function toggleFocusedModeButton() {
  (0, _DOM.default)('#watched-video-display-button').classList.toggle('bg-cyan-100');
  (0, _DOM.default)('#to-watch-video-display-button').classList.toggle('bg-cyan-100');
}
},{"../utils/DOM.js":"src/js/utils/DOM.js","../templates/videoList.js":"src/js/templates/videoList.js","../constants/filterType.js":"src/js/constants/filterType.js"}],"src/js/constants/confirmMessage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_SAVE_CANCEL_CONFIRM_MSG = exports.DELETE_VIDEO_CONFIRM_MSG = void 0;
const DELETE_VIDEO_CONFIRM_MSG = '해당 영상을 삭제하시겠습니까?';
exports.DELETE_VIDEO_CONFIRM_MSG = DELETE_VIDEO_CONFIRM_MSG;
const VIDEO_SAVE_CANCEL_CONFIRM_MSG = '저장을 취소하시겠습니까?';
exports.VIDEO_SAVE_CANCEL_CONFIRM_MSG = VIDEO_SAVE_CANCEL_CONFIRM_MSG;
},{}],"src/js/states/videoListType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filterType = require("../constants/filterType.js");

const videoListType = {
  value: _filterType.TO_WATCH_TYPE,

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  toggle() {
    this.value = this.value === _filterType.TO_WATCH_TYPE ? _filterType.WATCHED_TYPE : _filterType.TO_WATCH_TYPE;
  }

};
var _default = videoListType;
exports.default = _default;
},{"../constants/filterType.js":"src/js/constants/filterType.js"}],"src/js/handlers/videoSave.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _snackbarMessage = require("../constants/snackbarMessage.js");

var _classroom = require("../constants/classroom.js");

var _service = require("../service.js");

var _videoInfos = _interopRequireDefault(require("../states/videoInfos.js"));

var _app = require("../viewControllers/app.js");

var _searchModal = require("../viewControllers/searchModal.js");

var _confirmMessage = require("../constants/confirmMessage.js");

var _videoListType = _interopRequireDefault(require("../states/videoListType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleVideoSave($saveButton) {
  if (_videoInfos.default.size >= _classroom.MAX_SAVED_VIDEO_COUNT) {
    (0, _app.showSnackBar)(_snackbarMessage.EXCEED_SAVED_VIDEO_COUNT_MSG);
    return;
  }

  (0, _service.saveVideo)($saveButton.closest('.js-video'));
  (0, _searchModal.renderSavedVideoCount)(_videoInfos.default.size);
  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());
  (0, _searchModal.toggleSaveButton)($saveButton);
  (0, _app.showSnackBar)(_snackbarMessage.SAVE_SUCCESS_MSG);
}

function handleVideoSaveCancel($saveCancelButton) {
  if (!window.confirm(_confirmMessage.VIDEO_SAVE_CANCEL_CONFIRM_MSG)) return;
  (0, _service.cancelVideoSave)($saveCancelButton.closest('.js-video'));
  (0, _searchModal.renderSavedVideoCount)(_videoInfos.default.size);
  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());
  (0, _searchModal.toggleSaveButton)($saveCancelButton);
  (0, _app.showSnackBar)(_snackbarMessage.SAVE_CANCEL_SUCCESS_MSG);
}

function videoSaveManager({
  target
}) {
  if (target.classList.contains('js-save-button')) {
    handleVideoSave(target);
    return;
  }

  if (target.classList.contains('js-save-cancel-button')) {
    handleVideoSaveCancel(target);
  }
}

var _default = videoSaveManager;
exports.default = _default;
},{"../constants/snackbarMessage.js":"src/js/constants/snackbarMessage.js","../constants/classroom.js":"src/js/constants/classroom.js","../service.js":"src/js/service.js","../states/videoInfos.js":"src/js/states/videoInfos.js","../viewControllers/app.js":"src/js/viewControllers/app.js","../viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js","../constants/confirmMessage.js":"src/js/constants/confirmMessage.js","../states/videoListType.js":"src/js/states/videoListType.js"}],"src/js/handlers/latestKeywordSearch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _searchModal = require("../viewControllers/searchModal.js");

function handleLatestKeywordSearch({
  target
}) {
  if (!target.classList.contains('js-latest-keyword')) return;
  const latestKeyword = target.innerText;
  (0, _searchModal.search)(latestKeyword);
}

var _default = handleLatestKeywordSearch;
exports.default = _default;
},{"../viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js"}],"src/js/handlers/buttonControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _confirmMessage = require("../constants/confirmMessage.js");

var _snackbarMessage = require("../constants/snackbarMessage.js");

var _videoInfos = _interopRequireDefault(require("../states/videoInfos.js"));

var _videoListType = _interopRequireDefault(require("../states/videoListType.js"));

var _app = require("../viewControllers/app.js");

var _searchModal = require("../viewControllers/searchModal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  _videoInfos.default.toggleWatchType(targetId);

  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());
  (0, _app.showSnackBar)(_snackbarMessage.VIDEO_MOVE_SUCCESS_MSG);
}

function handleDeleteButton($target) {
  if (!window.confirm(_confirmMessage.DELETE_VIDEO_CONFIRM_MSG)) return;
  const targetId = $target.closest('.js-video').dataset.videoId;

  _videoInfos.default.remove(targetId);

  (0, _searchModal.renderSavedVideoCount)(_videoInfos.default.size);
  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());
  (0, _searchModal.updateModalSaveButton)(targetId);
  (0, _app.showSnackBar)(_snackbarMessage.SAVE_DELETE_SUCCESS_MSG);
}

function handleButtonsControl({
  target
}) {
  if (target.classList.contains('js-watched-button')) {
    handleWatchedButton(target);
    return;
  }

  if (target.classList.contains('js-delete-button')) {
    handleDeleteButton(target);
  }
}

var _default = handleButtonsControl;
exports.default = _default;
},{"../constants/confirmMessage.js":"src/js/constants/confirmMessage.js","../constants/snackbarMessage.js":"src/js/constants/snackbarMessage.js","../states/videoInfos.js":"src/js/states/videoInfos.js","../states/videoListType.js":"src/js/states/videoListType.js","../viewControllers/app.js":"src/js/viewControllers/app.js","../viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js"}],"src/js/handlers/modeChange.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _videoListType = _interopRequireDefault(require("../states/videoListType.js"));

var _videoInfos = _interopRequireDefault(require("../states/videoInfos.js"));

var _app = require("../viewControllers/app.js");

var _filterType = require("../constants/filterType.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleMode() {
  _videoListType.default.toggle();

  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());
  (0, _app.toggleFocusedModeButton)();
}

function handleModeChange({
  target
}) {
  if (target.id === 'to-watch-video-display-button' && _videoListType.default.get() === _filterType.WATCHED_TYPE) {
    toggleMode();
    return;
  }

  if (target.id === 'watched-video-display-button' && _videoListType.default.get() === _filterType.TO_WATCH_TYPE) {
    toggleMode();
  }
}

var _default = handleModeChange;
exports.default = _default;
},{"../states/videoListType.js":"src/js/states/videoListType.js","../states/videoInfos.js":"src/js/states/videoInfos.js","../viewControllers/app.js":"src/js/viewControllers/app.js","../constants/filterType.js":"src/js/constants/filterType.js"}],"src/js/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initState = initState;
exports.initEvent = initEvent;

var _DOM = _interopRequireDefault(require("./utils/DOM.js"));

var _videoSearch = _interopRequireDefault(require("./handlers/videoSearch.js"));

var _videoSave = _interopRequireDefault(require("./handlers/videoSave.js"));

var _app = require("./viewControllers/app.js");

var _latestKeywordSearch = _interopRequireDefault(require("./handlers/latestKeywordSearch.js"));

var _videoInfos = _interopRequireDefault(require("./states/videoInfos.js"));

var _latestKeywords = _interopRequireDefault(require("./states/latestKeywords.js"));

var _intersectionObserver = _interopRequireDefault(require("./states/intersectionObserver.js"));

var _buttonControl = _interopRequireDefault(require("./handlers/buttonControl.js"));

var _modeChange = _interopRequireDefault(require("./handlers/modeChange.js"));

var _searchModal = require("./viewControllers/searchModal.js");

var _videoListType = _interopRequireDefault(require("./states/videoListType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function initState() {
  await _videoInfos.default.init();
  (0, _searchModal.renderSavedVideoCount)(_videoInfos.default.size);
  (0, _app.renderSavedVideoList)(_videoInfos.default.get(), _videoListType.default.get());

  _latestKeywords.default.init();

  (0, _searchModal.renderLatestKeywordList)(_latestKeywords.default.get());

  _intersectionObserver.default.init();
}

function initEvent() {
  (0, _DOM.default)('#search-button').addEventListener('click', _app.openModal);
  (0, _DOM.default)('#modal-close-button').addEventListener('click', _app.closeModal);
  (0, _DOM.default)('#video-search-form').addEventListener('submit', _videoSearch.default);
  (0, _DOM.default)('#video-search-result').addEventListener('click', _videoSave.default);
  (0, _DOM.default)('#latest-keyword-list').addEventListener('click', _latestKeywordSearch.default);
  (0, _DOM.default)('#video-list').addEventListener('click', _buttonControl.default);
  (0, _DOM.default)('#mode-wrapper').addEventListener('click', _modeChange.default);
  (0, _DOM.default)('#video-search-modal').addEventListener('click', ({
    target
  }) => {
    if (target.id === 'video-search-modal') (0, _app.closeModal)();
  });
}
},{"./utils/DOM.js":"src/js/utils/DOM.js","./handlers/videoSearch.js":"src/js/handlers/videoSearch.js","./handlers/videoSave.js":"src/js/handlers/videoSave.js","./viewControllers/app.js":"src/js/viewControllers/app.js","./handlers/latestKeywordSearch.js":"src/js/handlers/latestKeywordSearch.js","./states/videoInfos.js":"src/js/states/videoInfos.js","./states/latestKeywords.js":"src/js/states/latestKeywords.js","./states/intersectionObserver.js":"src/js/states/intersectionObserver.js","./handlers/buttonControl.js":"src/js/handlers/buttonControl.js","./handlers/modeChange.js":"src/js/handlers/modeChange.js","./viewControllers/searchModal.js":"src/js/viewControllers/searchModal.js","./states/videoListType.js":"src/js/states/videoListType.js"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _init = require("./init.js");

(0, _init.initState)();
(0, _init.initEvent)();
},{"./init.js":"src/js/init.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34489" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map