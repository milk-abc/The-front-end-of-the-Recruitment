const { tplReplace } = require("../utils");
function tplLoader(source) {
  source = source.replace(/\s+/g, "");
  console.log("source", source);
  return `export default (options)=>{
		${tplReplace.toString()}
  	return tplReplace('${source}',options)
  }`;
}
module.exports = tplLoader;
