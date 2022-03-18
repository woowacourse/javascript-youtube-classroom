export const timeFormatter = (time) => {
  const [year, month, day] = time.split('T')[0].split('-');

  return `${year}년 ${month}월 ${day}일`;
};

export const snakeCaseToCamelCase = (string) =>
  string.replace(/([-_][a-z])/gi, (snakeCase) =>
    snakeCase.toUpperCase().replace('-', '').replace('_', ''),
  );
