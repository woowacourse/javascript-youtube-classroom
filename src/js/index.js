import AppBusiness from './business';
import App from './components';

const runApp = () => {
  new App(document.querySelector('body'));
  new AppBusiness();
};

window.addEventListener('DOMContentLoaded', () => {
  runApp();
});
