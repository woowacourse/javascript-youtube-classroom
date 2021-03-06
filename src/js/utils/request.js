export const request = async (url, method) => {
  try {
    const response = await fetch(url, { method });
    const json = await response.json();

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return json;
  } catch (e) {
    console.error(e);
  }
};
