import '../css/index.css';
import HomePage from './screen/homePage';
import MessageBot from './screen/messageBot';
import SearchVideoModal from './screen/searchVideoModal';

const DOM = {
  render() {
    const args = [...arguments];
    args.forEach((arg) => new arg());
  },
};

DOM.render(HomePage, SearchVideoModal, MessageBot);
