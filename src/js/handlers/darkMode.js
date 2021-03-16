import darkMode from '../states/darkMode.js';
import $ from '../utils/DOM.js';

function handleDarkMode({ target }) {
  target.checked
    ? $('html').classList.add('dark')
    : $('html').classList.remove('dark');

  darkMode.set(target.checked);
}

export { handleDarkMode };
