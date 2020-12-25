/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  const arr = str.split('-').map((item, index) => {
    return index ? `${item[0].toUpperCase()}${item.slice(1)}` : item;
  });
  return arr.join('');
}
