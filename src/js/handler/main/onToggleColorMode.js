import $DOM from '../../utils/DOM.js';

const toggleColorModes = () => {
  const mode = $DOM.HTML.dataset.colorMode;
  if (mode === 'dark') {
    $DOM.HTML.dataset.colorMode = 'light';
    return;
  }

  $DOM.HTML.dataset.colorMode = 'dark';
};

export const onToggleColorMode = () => {
  const currentMode = $DOM.HTML.dataset.colorMode;
  toggleColorModes(currentMode);
};
