onmessage = (event) => {
  let num = event.data;
  let res = 0;
  for (let i = 0; i < num; i++) {
    res += i;
  }
  postMessage(`Hi, ${res}`);
};
