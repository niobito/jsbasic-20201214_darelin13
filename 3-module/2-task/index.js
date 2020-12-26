/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  const min = a <= b ? a : b;
  const max = b >= a ? b : a;

  return arr.filter(number => number >= min && number <= max);
}
