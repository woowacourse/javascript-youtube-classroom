import { showSnackbar } from './showSnackbar.js';

export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    showSnackbar(`💣 Error : ${err} 💣`);
  }
};
