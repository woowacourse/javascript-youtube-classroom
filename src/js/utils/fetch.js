import { snackbar } from './snackbar.js';

export const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    snackbar(`💣 Error : ${err} 💣`);
  }
};
