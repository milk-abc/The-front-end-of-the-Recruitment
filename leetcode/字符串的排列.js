var checkInclusion = function (s1, s2) {
  let need = new Map();
  let Window = new Map();
  for (let word of s1) {
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
  while (right < s2.length) {
    let c = s2[right];
    right++;
    if (need.get(c)) {
      Window.set(c, Window.get(c) + 1);
      if (Window.get(c) === need.get(c)) {
        valid++;
      }
    }
		//当左右指针长度大于s1的长度时，左指针右移，保证只有s1长度
    while (right - left >= s1.length) {
      if (valid === need.size) {
        return true;
      }

      let d = s2[left];
      left++;
      if (need.get(d)) {
        if (Window.get(d) === need.get(d)) {
          valid--;
        }
        Window.set(d, Window.get(d) - 1);
      }
    }
  }
  return false;
};
