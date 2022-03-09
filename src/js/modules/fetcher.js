// options.body : params들이 들어있다.
export const fetcher = async (url, options) => {
  const response = await fetch(`${url}`, options);

  if (response.ok) {
    // 성공적으로 데이터 받아냄
    const data = await response.json();

    return data;
  }

  throw new Error(`api 요청 중 에러 발생: ${response.status}`);
};
