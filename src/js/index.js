import App from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App(document.querySelector('#app'));
  app.run();
});
