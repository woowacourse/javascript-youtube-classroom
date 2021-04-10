const textarea = document.createElement("textarea");

const decodeHTML = (html) => {
  textarea.innerHTML = html;
  return textarea.value;
};

export default decodeHTML;
