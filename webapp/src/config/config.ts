const configObject = require(process.env.NODE_ENV === "development"
  ? "./development.json"
  : "./production.json");

const config : any = (path : string) => deepFind(configObject, path);

function deepFind(obj : any, path : string) {
  var paths = path.split("."),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

export default config;
