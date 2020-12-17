/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n === 0) {
    return 1;
  }

  let factorial = 1;
  while (n) {
    factorial = factorial * n;
    --n;
  }
  return factorial;
}
