var minWindow = function (s, t) {
  let need = new Map();
  let Window = new Map();
  for (let word of t) {
    if (!need.has(word)) {
      need.set(word, 1);
    } else {
      need.set(word, need.get(word) + 1);
    }
    Window.set(word, 0);
  }
  let left = 0,
    right = 0;
  let valid = 0;
  let start = 0,
    len = Infinity;
  while (right < s.length) {
    let c = s[right];
    right++;
    if (need.get(c)) {
      Window.set(c, Window.get(c) + 1);
      if (Window.get(c) === need.get(c)) {
        valid++;
      }
    }
    while (valid === need.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      let d = s[left];
      left++;
      if (need.get(d)) {
        if (Window.get(d) === need.get(d)) {
          valid--;
        }
        Window.set(d, Window.get(d) - 1);
      }
    }
  }
  return len == Infinity ? "" : s.substr(start, len);
};
let s = "ADOBECODEBANC",
  t = "ABC";
console.log(minWindow(s, t));
