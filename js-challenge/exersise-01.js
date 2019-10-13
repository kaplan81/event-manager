const arg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const result01 = insertAd(arg);

console.log('%cExercise 01 result:', consoleStyle, result01);

function insertAd(coll) {
  const isArray = Array.isArray(coll);

  if (!isArray) {
    throw Error('Argument passed must be an array!');
  }

  const ad = 'advertisement';
  let pointer = 0;

  for (let i = 0; i < coll.length; i++) {
    if (i === pointer + 4) {
      coll.splice(i + 1, 0, ad);
      pointer = pointer + 5;
    }
  }

  return coll;
}
