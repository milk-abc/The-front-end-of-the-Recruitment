// The TestCase is shown below
/**
 * output
 * 'a.b':1,
 * 'a.c':2,
 * 'd[0]':5,
 * 'd[1]':6,
 * 'e[]':null
 */
const obj = {
  a: { b: 1, c: 2, g: { h: 3 } },
  d: [5, 6],
  e: [],
  f: "foo",
};
function flatten(obj) {
  let newObj = {};
  function recurse(obj, initKey = "") {
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        recurse(null, initKey + "[]");
      } else {
        for (let key in obj) {
          recurse(obj[key], initKey + "[" + String(key) + "]");
        }
      }
    } else if (obj !== null && typeof obj === "object") {
      for (let key in obj) {
        let newInitKey = initKey ? initKey + "." : initKey;
        recurse(obj[key], newInitKey + String(key));
      }
    } else {
      newObj[initKey] = obj;
    }
  }
  recurse(obj);
  return newObj;
}

console.log("flatten", JSON.stringify(flatten(obj)));
