function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.+?)\}\}/g, (node, key) => {
    return replaceObject[key];
  });
}
module.exports = { tplReplace };
