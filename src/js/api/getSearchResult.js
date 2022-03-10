export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  // const nextPageToken = nextPageToken;
  // const pageUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyword}&key=${kkojaeKey}&maxResults=10&pageToken=${nextPageToken}`;
  const usageRediricet = "https://unruffled-turing-aacdf7.netlify.app";
  const kkojaeRedirect = "https://clever-aryabhata-ff1fc1.netlify.app";
  const REDIRECT_SERVER_HOST = kkojaeRedirect;

  const url = new URL("youtube/v3/search", REDIRECT_SERVER_HOST);
  const parameters = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: 10,
    regionCode: "kr",
    safeSearch: "strict",
    pageToken: nextPageToken || "",
    q: searchKeyword,
  });

  // console.log(url);
  // console.log(parameters);
  url.search = parameters.toString();
  console.log(url);
  // console.log(parameters);
  // console.log(window);

  // const pastUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${usageKey}&maxResults=10&q=${searchKeyword}${
  //   token ? `&pageToken=${token}` : ""
  // }`;

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
