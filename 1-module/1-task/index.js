/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n === 0) {
    return 1;
  }

  let factorial = 0;
  while (n) {
    if (!factorial) {
      factorial = n;
    } else {
      factorial = factorial * n;
    }
    --n;
  }
  return factorial;
}
