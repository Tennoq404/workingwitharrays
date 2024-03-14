/*
const CalcAverageHumanAge = function (ages) {
  const humanage = ages.map(ages => (ages <= 2 ? 2 * ages : 16 + ages + 4));
  console.log(humanage);
  const newage = humanage.filter(ages => ages > 18);
  console.log(newage);
  const aveage = newage.reduce((acc, ages) => acc + ages, 0) / newage.length;

  console.log(aveage);
};
CalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

 */

const CalcAverageHumanAge = dogages =>
  dogages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = CalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg1);
