import AppBusiness from './business';
import AppComponent from './components';

const runApp = () => {
  new AppComponent(document.querySelector('body'));
  new AppBusiness();
};

export default runApp;
