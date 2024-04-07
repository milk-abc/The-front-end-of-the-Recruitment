const { tplReplace } = require("../utils");
const { getOptions } = require("loader-utils");
function tplLoader(source) {
  source = source.replace(/\s+/g, "");
  const { log } = getOptions(this);
  const _log = log
    ? `console.log('compiled the file which is from ${this.resourcePath}')`
    : "";
  console.log("source", source);
  return `export default (options)=>{
		${tplReplace.toString()}
    ${_log.toString()}
  	return tplReplace('${source}',options)
  }`;
}
module.exports = tplLoader;
