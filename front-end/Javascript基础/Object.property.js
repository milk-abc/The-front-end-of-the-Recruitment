let obj = { name: "li" };
Object.defineProperty(obj, "name", {
  get() {
    return val;
  },
  set(newval) {
    console.log(val, newval);
    val = newval;
  },
});
