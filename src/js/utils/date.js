export default {
  toYMDArray = (date) => {
    return new Date(date).toLocaleDateString('ko-KR').split('.');
  }
}