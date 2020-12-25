/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}
