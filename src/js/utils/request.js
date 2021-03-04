export const request = async (url, method) => {
  try {
    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
