import '../css/index.css';
import HomePage from './screen/homePage';
import MessageBot from './screen/messageModal';
import SearchVideoModal from './screen/searchVideoModal';

const generateInstance = function () {
  const args = [...arguments];
  args.forEach((arg) => new arg());
};

generateInstance(HomePage, SearchVideoModal, MessageBot);
