var compareVersion = function (version1, version2) {
  let left1 = 0,
    left2 = 0,
    digit1,
    digit2,
    temp;
  while (left1 < version1.length || left2 < version2.length) {
    if (left1 < version1.length && left2 < version2.length) {
      temp = left1;
      while (left1 < version1.length && version1[left1] !== ".") {
        left1++;
      }
      digit1 = parseInt(version1.slice(temp, left1));
      left1++;
      temp = left2;
      while (left2 < version2.length && version2[left2] !== ".") {
        left2++;
      }
      digit2 = parseInt(version2.slice(temp, left2));
      left2++;
      if (digit1 > digit2) {
        return 1;
      } else if (digit1 < digit2) {
        return -1;
      }
    } else if (left1 < version1.length) {
      temp = left1;
      while (left1 < version1.length && version1[left1] !== ".") {
        left1++;
      }
      digit1 = parseInt(version1.slice(temp, left1));
      left1++;
      if (digit1 > 0) {
        return 1;
      }
    } else {
      temp = left2;
      while (left2 < version2.length && version2[left2] !== ".") {
        left2++;
      }
      digit2 = parseInt(version2.slice(temp, left2));
      left2++;
      if (digit2 > 0) {
        return -1;
      }
    }
  }
  return 0;
};
let ans = compareVersion("1", "1.0.1");
console.log("ans", ans);
function sortVersions(versions) {
  return versions.sort((a, b) => {
    const aVersion = a.split(".").map((num) => parseInt(num));
    const bVersion = b.split(".").map((num) => parseInt(num));
    const len = Math.max(aVersion.length, bVersion.length);
    for (let i = 0; i < len; i++) {
      const aNum = aVersion[i] || 0;
      const bNum = bVersion[i] || 0;
      if (aNum > bNum) {
        return 1;
      } else if (aNum < bNum) {
        return -1;
      }
    }
    return 0;
  });
}
console.log(sortVersions(["2.1.0.1", "0.402.1", "10.2.1", "5.1.2", "1.0.4.5"]));
