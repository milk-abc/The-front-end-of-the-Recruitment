const { randomNum } = require("./util");
const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#/;
const reg_crossbar = /^\-/;
const reg_number = /^\d/;

function createTree(mdArr) {
  let _htmlPool = {};
  let _lastMark = "";
  let _key = 0;
  mdArr.forEach((mdFragment) => {
    const matched = mdFragment.match(reg_mark);
    console.log(matched);
    if (matched) {
      const mark = matched[1];
      const input = matched["input"].replace(/\r/g, "");
      if (reg_sharp.test(mark)) {
        const tag = `h${mark.length}`;
        const tagContent = input.replace(reg_mark, "");
        if (_lastMark === mark) {
          _htmlPool[`${tag}-${_key}`].tags.push(
            `<${tag}>${tagContent}</${tag}>`
          );
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`${tag}-${_key}`] = {
            type: "single",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }

      if (reg_crossbar.test(mark)) {
        const tag = `li`;
        const tagContent = input.replace(reg_mark, "");
        if (_lastMark === mark) {
          _htmlPool[`ul-${_key}`].tags.push(`<${tag}>${tagContent}</${tag}>`);
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`ul-${_key}`] = {
            type: "wrap",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }

      if (reg_number.test(mark)) {
        const tag = `li`;
        const tagContent = input.replace(reg_mark, "");
        if (reg_number.test(_lastMark)) {
          _htmlPool[`ol-${_key}`].tags.push(`<${tag}>${tagContent}</${tag}>`);
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`ol-${_key}`] = {
            type: "wrap",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }
    }
  });
  console.log(_htmlPool);
  return _htmlPool;
}
function compileHTML(_mdArr) {
  const _htmlPool = createTree(_mdArr);
  let _htmlStr = "";
  let item;
  for (let k in _htmlPool) {
    item = _htmlPool[k];
    console.log(k, item);
    let { type, tags } = item;
    if (type === "wrap") {
      _htmlStr += `<${k.split("-")[0]}>`;
      tags.forEach((tag) => {
        _htmlStr += tag;
      });
      _htmlStr += `</${k.split("-")[0]}>`;
    } else {
      tags.forEach((tag) => {
        _htmlStr += tag;
      });
    }
  }
  console.log("_htmlStr", _htmlStr);
  return _htmlStr;
}
module.exports = { compileHTML };
