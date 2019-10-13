pairs = [[1, 4], [6, 8], [0, 0], [4, 2]];

const result02 = sortPairs(pairs);

console.log('%cExercise 02 result:', consoleStyle, result02);

function sortPairs(collOfPairs) {
  const isArray = Array.isArray(collOfPairs);

  if (!isArray) {
    throw Error('Argument passed must be an array!');
  }

  collOfPairs.sort((a, b) => {
    if (a.length !== 2 || b.length !== 2) {
      throw Error(
        `Each element of the argument array must be a pair and [${a}] is not.`
      );
    }

    return a[0] - b[0];
  });

  return collOfPairs;
}
