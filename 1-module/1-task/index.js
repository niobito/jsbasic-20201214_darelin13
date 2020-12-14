/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let counter = 0;
  let factorial = 0;
  if (n === 0) {
    factorial = 1;
  } else {
    while (counter < n) {
      if (!factorial) {
        factorial = n;
      } else {
        factorial = factorial * (n - counter);
      }
      ++counter;
    }
  }
  return factorial;
}
