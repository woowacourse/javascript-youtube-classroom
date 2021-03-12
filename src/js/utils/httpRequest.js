export const httpRequest = async (uri, method) => {
  try {
    const response = await fetch(uri, { method });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return json;
  } catch (e) {
    console.error(e);
  }
};
