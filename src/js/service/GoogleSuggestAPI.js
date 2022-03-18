export default class GoogleSuggestAPI {
  convertToCorsUrl(url) {
    const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
    return protocol + '//cors-anywhere.herokuapp.com/' + url;
  }

  callSuggestAPI(targetKeyword) {
    const URL = this.convertToCorsUrl(
      `https://suggestqueries.google.com/complete/search?output=firefox&q=${targetKeyword}`,
    );
    return fetch(URL).then(response => response.json());
  }
}
