require('dotenv').config();

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config.env.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  return config;
};
