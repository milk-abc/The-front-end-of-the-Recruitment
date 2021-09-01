while ((line = read_line())) {
  let arr = line.split(" ").map((item) => parseInt(item));
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
