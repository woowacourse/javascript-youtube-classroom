import './css/index.css';
import './js/index';
import '../src/assets/images/not_found.png';

const test = async () => {
  try {
    const data = await fetcher('https://jsonplaceholder.typicode.com/posts/1');
  } catch (error) {
    alert(error);
  }
};

test();
