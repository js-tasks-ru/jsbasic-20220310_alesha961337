function getMinMax(str) {
  let arrStr = str.split(" ");
  let arrFiltred = arrStr.filter(num => Number(num));
  let mappingNum = arrFiltred.map(num => +num);
  let sortingNum = mappingNum.sort((a, b) => a - b);
  let objMinMax = {
      min: sortingNum[0],
      max: sortingNum[sortingNum.length - 1]
  };
  return objMinMax;
}
