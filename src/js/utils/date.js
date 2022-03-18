const getRelativeDate = (date) => {
  const time = date.indexOf('Z') ? new Date(date.replace('Z', '')) : new Date(date);

  const timeFormats = [
    [60, '초', 1], // 60
    [3600, '분', 60], // 60*60, 60
    [86400, '시간', 3600], // 60*60*24, 60*60
    [604800, '일', 86400], // 60*60*24*7, 60*60*24
    [2419200, '주', 604800], // 60*60*24*7*4, 60*60*24*7
    [29030400, '개월', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [2903040000, '년', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [58060800000, '백년', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  const seconds = (new Date() - time) / 1000;
  const token = '전';

  let i = 0;
  while (true) {
    const format = timeFormats[(i += 1)];
    if (Math.floor(seconds / format[2]) === 0) {
      return '방금';
    }
    if (seconds < format[0]) {
      console.log(seconds, format[0]);
      return `${Math.floor(seconds / format[2])}${format[1]} ${token}`;
    }
  }
};

export default getRelativeDate;
