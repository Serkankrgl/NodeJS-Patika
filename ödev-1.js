const pi = 3.14;
let CalculateArea = function () {
  let r = process.argv.slice(2)[0];
  console.log(2 * pi * r * r);
};

CalculateArea();
