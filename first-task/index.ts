const sum_to_n_a = function (n: number) {
  return (n * (n + 1)) / 2;
};

const sum_to_n_b = function (n: number) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_c = function (n: number) {
  let sum = 0;
  while (n > 0) {
    sum += n;
    n--;
  }
  return sum;
};
