export const randomArr = () => {
  const minVal = 0;
  const maxVal = 100;
  const minLen = 3;
  const maxLen = 17;

  const arrLen = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  const arr = [];
  for (let i = 0; i < arrLen; i++) {
    arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
  }

  return arr;
};
