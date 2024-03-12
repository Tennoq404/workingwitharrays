const CalcAverageHumanAge = function (ages) {
  const humanAge = ages.map(ages => (ages <= 2 ? 2 * ages : 16 + ages * 4));
};
CalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
