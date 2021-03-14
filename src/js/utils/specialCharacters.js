export const unescape = (str) => {
  return str
    .replaceAll('&#60;', '<')
    .replaceAll('&lt;', '<')
    .replaceAll('&#62;', '>')
    .replaceAll('&gt;', '>')
    .replaceAll('&#38;', '&')
    .replaceAll('&amp;', '&')
    .replaceAll('&#34;', '"')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'");
};

export const removeNewLine = (str) => {
  return str.replace('\n', '');
};
