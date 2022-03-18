import '../css/index.css';
import HomePage from './screen/homePage';
import SearchVideoModal from './screen/searchVideoModal';

const DOM = {
  render() {
    const args = [...arguments];
    args.map((arg) => new arg());
  },
};

DOM.render(HomePage, SearchVideoModal);
