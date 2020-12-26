/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const strToArr = str.split(/ |,\s*/i);

  const arr = strToArr
    .reduce((prevValue, item) => !isNaN(item) ? prevValue.concat(Number(item)) : prevValue, [])
    .sort((a, b) => a - b);

  return {
    min: arr[0],
    max: arr[arr.length - 1],
  };
}
