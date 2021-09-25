// function toCamelCaseVar(variable) {
//   // write code here
//   let reg = /[\_\-](\w)/g;
//   return variable.replace(reg, function (all, cur) {
//     return cur.toUpperCase();
//   });
// }
// console.log(toCamelCaseVar("Foo_style_css"));
function sortVersion(versions) {
  // write code here
  let compare = function (version1, version2) {
    const v1 = version1.split(".");
    const v2 = version2.split(".");
    for (let i = 0; i < v1.length || i < v2.length; i++) {
      let a = 0,
        b = 0;
      if (i < v1.length) {
        a = parseInt(v1[i]);
      }
      if (i < v2.length) {
        b = parseInt(v2[i]);
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
    }
    return 0;
  };
  versions.sort((x, y) => compare(x, y));
  return versions;
}
console.log(sortVersion(["1.45.0", "1.5", "6", "2.3.4.5"]));
