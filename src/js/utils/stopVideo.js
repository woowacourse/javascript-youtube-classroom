export default function stopVideo(iframe) {
  iframe.contentWindow.postMessage(
    '{"event":"command", "func":"stopVideo", "args":""}',
    '*',
  );
}
