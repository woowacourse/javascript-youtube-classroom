const handleError = (errorMessage) => {
  switch (errorMessage) {
    case "Failed to fetch":
      alert("인터넷 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.");
      break;
    case "":
      break;
  }
};

export default handleError;
