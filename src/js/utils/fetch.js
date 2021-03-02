function stringigyParams(params) {
  const sparam = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  console.log(sparam);
  return sparam;
}

export async function fetchGET(baseURL, api, params) {
  return await fetch(`${baseURL}/${api}?${stringigyParams(params)}`).then(
    (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    }
  );
}
