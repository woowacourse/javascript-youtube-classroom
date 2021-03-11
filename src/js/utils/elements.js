import { $ } from "./dom.js";

const elements = {
  $body: $("body"),

  $watchLaterViewButton: $("#watch-later-view-button"),
  $watchedViewButton: $("#watched-view-button"),
  $notSaved: $("#not-saved"),
  $notWatched: $("#not-watched"),
  $watchLaterVideos: $("#watch-later-videos"),
  $watchedVideos: $("#watched-videos"),

  $searchButton: $("#search-button"),
  $searchModal: $("#search-modal"),
  $searchModalClose: $("#search-modal-close"),
  $searchForm: $("#search-form"),
  $searchResults: $("#search-results"),
  $searchResultsInner: $("#search-results-inner"),
  $hiddenTarget: $("#hidden-target"),
  $skeletonSearchResults: $("#skeleton-search-results"),
  $skeletonUIContainer: $("#skeleton-ui-container"),
  $notFound: $("#not-found"),
  $keywordHistory: $("#keyword-history"),
  $savedVideoCount: $("#saved-video-count"),
};

export default elements;
