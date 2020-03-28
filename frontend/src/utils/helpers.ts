export const titleCase = (str: string) => {
  const strArr = str.toLowerCase().split(' ');
  for (var i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join(' ');
};
