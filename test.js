function test(x, n) {
  let res = 1;
  if (x === 0) {
    if (n === 0) {
      return 1;
    } else {
      return 0;
    }
  }
  for (let i = 0; i < Math.abs(n); i++) {
    res = res * x;
  }
  return n > 0 ? res : 1 / res;
}
//2^2=4  2^4=16  2^(2*2)=(2^2)*(2^2)=16
//x^n=(x^(n/2))*(x^(n/2))
console.log(test(2, 3));
console.log(test(2, -3));
console.log(test(0, 0));
console.log(test(0, 2));
console.log(test(1, 2));

// 1,2,3,4,.....,99,100
//cnt=1
//第一次取奇数位置的求，会取1,3,...,99，剩50个
//2 4 6 8
//cnt=2
//再取奇数位，第一位的偶数位变成奇数位，再剩25个
// 4 8 12 16
//cnt=3 2^cnt
//剩12个
//8 16 24 32 
//cnt=4
//剩6个
//16 32 48 64 
//cnt =5
//32 64 
//cnt=6
//64