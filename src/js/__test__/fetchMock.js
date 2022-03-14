import dummyMultipleVideo from './dummy';

const fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(dummyMultipleVideo),
  })
);

export default fetch;
