function judgePrime(num) {
  if (num < 3) {
    return true;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

const prepareGetPrime = () => {
  let i = 0;
  return function next() {
    i++;
    while (!judgePrime(i)) {
      i++;
    }
    console.log(i);
    return i;
  };
};
const getPrime = prepareGetPrime();
getPrime();
getPrime();
getPrime();
getPrime();
