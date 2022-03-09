import './css/index.css';
import { fetcher } from './js/modules/fetcher';

const test = async () => {
  try {
    const data = await fetcher('https://jsonplaceholder.typicode.com/posts/1');
  } catch (error) {
    alert(error);
  }
};

test();
